import React from 'react';
import Web3 from 'web3';
import {
  Col,
  Row,
  Grid
} from 'react-bootstrap';

import ProposalBlock from './ProposalBlock';
import CreateProposalForm from './CreateProposalForm';

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


const getRawProposals = async (instance) => {
  let proposals = []
  const proposalCount = await instance.proposalCount()

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

const getVotedProposalIds = async (instance, account) => {
  const voterAddress = 0
  let votedProposalIds = []

  const voter = await instance.getVoter(account)

  try {
    if (voter[voterAddress] != "0x0000000000000000000000000000000000000000") {
      votedProposalIds = voter[1].map((id) => (parseInt(id)))
    }
  } catch (error) {
    console.log("getVotedProposalIds Error:", error)
  }

  return votedProposalIds
}

const normalizeProposals = (rawProposals, votedProposalIds) => {
  return rawProposals.map((rawProposal, index) => {
    let voted = votedProposalIds.includes(index)

    return {
      id: index,
      destination: rawProposal[0],
      creator: rawProposal[1],
      voteCount: parseInt(rawProposal[2]),
      yesCount: parseInt(rawProposal[3]),
      noCount: parseInt(rawProposal[4]),
      isClosed: rawProposal[5],
      isPending: false,
      voted: voted
    }
  })
}


const getRawProposalsAndVotedProposals = async (instance, account) => {
  const rawProposals = await getRawProposals(instance)
  const votedProposalIds = await getVotedProposalIds(instance, account)

  return { rawProposals, votedProposalIds }
}

const vote = async (instance, account, proposalIndex) => {
  const yes = 0

  try {
    const result = await instance.vote(proposalIndex, yes, { from: account })
    return result
  } catch (error) {
    console.log("vote Error:", error)
  }
}

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      contract: {},
      contractAddress: "Fetching contract address...",
      owner: "Fetching owner...",
      proposals: []
    }
  }

  componentDidMount() {
    this.getContract().then((instance) => {
      this.setState({ contract: instance })
      this.getOwner()
      this.getProposals()
    })
  }

  getContract() {
    const self = this
    return TravelNoteContract.deployed().then((instance) => {
      self.setState({ contractAddress: instance.address })
      return instance
    })
  }

  getProposals() {
    const instance = this.state.contract
    const self = this

    myWeb3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.log(error);
      }

      getRawProposalsAndVotedProposals(instance, accounts[0]).then(
        ({ rawProposals, votedProposalIds }) => {
          const proposals = normalizeProposals(rawProposals, votedProposalIds)
          self.setState({ proposals: proposals })
        }
      )
    })
  }

  getOwner() {
    const instance = this.state.contract
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

  createProposalHandler(event, inputValue) {
    event.preventDefault()

    this.createProposal(inputValue)
  }

  createProposal(destination) {
    const instance = this.state.contract
    const self = this

    myWeb3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.log(error);
      }

      instance.createProposal(destination, { from: accounts[0] }).then((something) => {
        console.log("something", something)
        // TODO:
        // * add event
        // * add state for proposal
        // * listen succesful event

        const newProposal = {
          id: self.state.proposals.length,
          destination: destination,
          creator: accounts[0],
          voteCount: 0,
          yesCount: 0,
          noCount: 0,
          isClosed: false,
          isPending: true
        }

        self.setState({ proposals: [...self.state.proposals, newProposal] })
      }).catch((error) => {
        console.log("createProposal Error:", error)
      })
    })
  }

  onVoteHandler(proposalId) {
    const instance = this.state.contract
    const self = this

    myWeb3.eth.getAccounts((error, accounts) => {
      if (error) {
        console.log(error);
      }

      vote(instance, accounts[0], proposalId).then((_result) => {
        const newProposals = self.state.proposals.map((proposal) => {
          if (proposal.id != proposalId) {
            return proposal
          }

          const yesCount = proposal.yesCount + 1
          const voteCount = proposal.voteCount + 1

          return Object.assign(proposal, { yesCount: yesCount, voteCount: voteCount, voted: true })
        })

        self.setState({ proposals: newProposals })
      })
    })
  }


  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8} mdOffset={2}>
            <header className="text-center">
              <h1>Travel Vote</h1>
              <h2>Vote where you want to go.</h2>
              <p>Contract: {this.state.contractAddress}</p>
              <p>Contract owner: {this.state.owner}</p>
            </header>
          </Col>
          <Row>
            <Col md={12} className="text-center">
              <h2>Proposals</h2>
              <CreateProposalForm createProposalHandler={this.createProposalHandler.bind(this)} />
            </Col>
          </Row>
          <ProposalBlock proposals={this.state.proposals} onVoteHandler={this.onVoteHandler.bind(this)} />
        </Row>
      </Grid>
    )
  }
}
