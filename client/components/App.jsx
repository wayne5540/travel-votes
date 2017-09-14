import React from 'react';
import Web3 from 'web3';

const contract = require("truffle-contract");
const contractJson = require("../../build/contracts/TravelVote.json")

const getWeb3 = () => {
  const { web3 } = window

  if (typeof web3 !== 'undefined') {
    console.log("Web3 found")
    return new Web3(web3.currentProvider)
  } else {
    console.log("Web3 not found")
    return new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
  }
}

const myWeb3 = getWeb3()
const TravelNoteContract = contract(contractJson)
TravelNoteContract.setProvider(myWeb3.currentProvider)



const ProposalItem = (props) => {
  return (
    <div>
      <h2>Destination:</h2>
      <p>{props.destination}</p>
    </div>
  )
}

const ProposalBlock = (props) => {
  const proposalItems = props.proposals.map((proposal) => (
    <ProposalItem destination={proposal.destination} key={proposal.id} />
  ))

  return (
    <div>
      <h1>Proposals:</h1>
      {proposalItems}
    </div>
  )
}

const getRawProposals = async (instance) => {
  let proposals = []

  const proposalCount = await instance.proposalCount()
  console.log("proposalCount:", parseInt(proposalCount))

  try {
    for (var index = 0; index < parseInt(proposalCount); index++) {
      let proposal = await instance.proposals(index)
      proposals.push(proposal)
    }
  } catch (error) {
    console.log("getRawProposals Error:", error)
  }

  return proposals
}

const normalizeProposals = (rawProposals) => {
  return rawProposals.map((rawProposal, index) => (
    {
      id: index,
      destination: rawProposal[0],
      creator: rawProposal[1],
      voteCount: parseInt(rawProposal[2]),
      yesCount: parseInt(rawProposal[3]),
      noCount: parseInt(rawProposal[4]),
      isClosed: rawProposal[5]
    }
  ))
}


export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      contractAddress: "",
      owner: "Wayne",
      proposals: []
    }
  }

  componentDidMount() {
    this.getContract().then((instance) => {
      this.getOwner(instance)
      this.getProposals(instance)
    })
  }

  getContract() {
    const self = this
    return TravelNoteContract.deployed().then((instance) => {
      self.setState({ contractAddress: instance.address })
      return instance
    })
  }

  createProposal() {
    const self = this

    myWeb3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.log(error);
      }

      // instance.createProposal("Disnnnnnnney!", { from: accounts[0] })

    })
  }

  getProposals(instance) {
    const self = this

    getRawProposals(instance).then((rawProposals) => {
      let proposals = normalizeProposals(rawProposals)
      console.log("inside:", proposals)
      self.setState({ proposals: proposals })
    }).catch((error) => {
      console.log("this.getProposals Error:", error)
    })
  }

  getOwner(instance) {
    const self = this

    myWeb3.eth.getAccounts( (error, accounts) => {
      if (error) {
        console.log(error);
      }

      instance.owner().then((owner) => {
        self.setState({ owner })
      }).catch(function (err) {
        console.log("Error:", err)
      })
    })
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Travel Vote</h1>
        <h2>Vote where you want to go.</h2>
        <p>Contract: {this.state.contractAddress}</p>
        <p>Contract owner: {this.state.owner}</p>
        <ProposalBlock proposals={this.state.proposals}/>
      </div>
    )
  }
}

// export default App