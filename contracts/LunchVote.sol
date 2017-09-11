pragma solidity ^0.4.15;

contract LunchVote {
  address public owner;
  bool public inProgress;
  string public title;
  address[] voters;


  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function LunchVote() {
    owner = msg.sender;
    inProgress = false;
  }

  function start(string newTitle) onlyOwner {
    require(inProgress != true);
    inProgress = true;
    title = newTitle;
  }

  function close() onlyOwner {
    require(inProgress != false);
    inProgress = false;
  }

  function getVoters() constant returns (address[]) {
    return voters;
  }

  function vote() {
    // if (yes) {
      
    // } else {
      
    // }
    voters.push(msg.sender);
  }
}