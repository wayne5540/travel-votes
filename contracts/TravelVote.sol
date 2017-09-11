pragma solidity ^0.4.15;

contract TravelVote {
  address public owner;

  struct Proposal {
    string destination;
    address creator;
    uint voteCount;
  }

  Proposal[] public proposals;

  function TravelVote() {
    owner = msg.sender;
  }

  function createProposal(string destination) {
    proposals.push(Proposal({
      destination: destination,
      creator: msg.sender,
      voteCount: 0
    }));
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