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
  }

  function closeProposal(uint proposal) {
    proposals[proposal].isClosed = true;
  }

  function vote(uint proposal, VoteType decision) {
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

  // address public owner;
  // bool public inProgress;
  // string public title;
  // address[] voters;
  // uint public agreementCount;
  // enum Results { Success, Failed, Even }
  // Results public result;

  // modifier onlyOwner {
  //   require(msg.sender == owner);
  //   _;
  // }

  // function TravelVote() {
  //   owner = msg.sender;
  //   inProgress = false;
  // }

  // function start(string newTitle) onlyOwner {
  //   require(inProgress != true);
  //   inProgress = true;
  //   title = newTitle;
  // }

  // function close() onlyOwner {
  //   require(inProgress != false);

  //   inProgress = false;

  //   if (agreementCount == voters.length - agreementCount) {
  //     result = Results.Even;
  //   } else if (agreementCount > voters.length - agreementCount) {
  //     result = Results.Success;
  //   } else {
  //     result = Results.Failed;
  //   }
  // }

  // function getVoters() constant returns (address[]) {
  //   return voters;
  // }

  // function vote(bool yes) {
  //   for (uint index = 0; index < voters.length; index++) {
  //     if (voters[index] == msg.sender) {
  //       require(false);
  //     }
  //   }

  //   if (yes) {
  //     agreementCount = agreementCount + 1;
  //   }

  //   voters.push(msg.sender);
  // }
}