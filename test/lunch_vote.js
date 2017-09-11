var LunchVote = artifacts.require("./LunchVote.sol");

contract('LunchVote', function (accounts) {
  it("sets sender as owner", function () {
    return LunchVote.deployed().then(function (instance) {
      return instance.owner();
    }).then(function(owner) {
      assert.equal(owner, accounts[0]);
    })
  });
});