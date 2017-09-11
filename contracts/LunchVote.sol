pragma solidity ^0.4.15;

contract LunchVote {
  address public owner;
  address[] public voters;
  bool public inProgress;
  
  function LunchVote() {
    owner = msg.sender;
    inProgress = false;
  }

  function startVote() {
    require(inProgress != true);
    inProgress = true;
  }
}