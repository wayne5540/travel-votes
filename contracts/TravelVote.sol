pragma solidity ^0.4.15;

contract TravelVote {
  struct Proposal {
    string destination;
    address creator;
    uint voteCount;
    uint yesCount;
    uint noCount;
    bool isClosed;
  }

  struct Voter {
    address voterAddress;
    uint[] votedProposals; // indexes of voted proposals
  }

  enum VoteType { Yes, No }

  address public owner;
  uint public proposalCount;
  Proposal[] public proposals;

  mapping(address => Voter) public voters;

  function TravelVote() {
    owner = msg.sender;
  }

  function createProposal(string destination) {
    proposals.push(Proposal({
      destination: destination,
      creator: msg.sender,
      voteCount: 0,
      yesCount: 0,
      noCount: 0,
      isClosed: false
    }));
    proposalCount = proposalCount + 1;
  }

  function closeProposal(uint proposal) {
    if (msg.sender != proposals[proposal].creator) {
      revert();
    }

    proposals[proposal].isClosed = true;
  }

  function vote(uint proposal, VoteType decision) {
    require(!proposals[proposal].isClosed);

    Voter storage sender = voters[msg.sender];

    for (uint index = 0; index < sender.votedProposals.length; index++) {
      if (sender.votedProposals[index] == proposal) {
        revert();
      }
    }

    if (decision == VoteType.Yes) {
      proposals[proposal].yesCount = proposals[proposal].yesCount + 1;
    } else if (decision == VoteType.No) {
      proposals[proposal].noCount = proposals[proposal].noCount + 1;
    } else {
      revert();
    }
    proposals[proposal].voteCount = proposals[proposal].voteCount + 1;
    sender.votedProposals.push(proposal);
  }

  function getVoter(address addr) public constant returns (address, uint[]) {
    return (voters[addr].voterAddress, voters[addr].votedProposals);
  }
}