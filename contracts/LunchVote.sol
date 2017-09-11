pragma solidity ^0.4.15;

contract LunchVote {
  address public owner;
  address[] public voters;
  bool public inProgress;
  
  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function LunchVote() {
    owner = msg.sender;
    inProgress = false;
  }

  function startVote() onlyOwner {
    require(inProgress != true);
    inProgress = true;
  }
}