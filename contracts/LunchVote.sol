pragma solidity ^0.4.15;

contract LunchVote {
  address public owner;
  
  function LunchVote() {
    owner = msg.sender;
  }
}