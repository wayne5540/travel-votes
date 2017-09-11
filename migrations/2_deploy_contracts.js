var LunchVote = artifacts.require("./LunchVote.sol");

module.exports = function(deployer) {
  deployer.deploy(LunchVote);
};
