pragma solidity ^0.4.15;

contract LunchVote {
  address public owner;
  address[] public voters;
  bool public inProgress;
  string public title;
  
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
}