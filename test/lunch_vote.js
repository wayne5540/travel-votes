const LunchVote = artifacts.require("./LunchVote.sol")

contract('LunchVote', (accounts) => {
  it("sets sender as owner", () => {
    LunchVote.deployed().then((instance) => (
      instance.owner()
    )).then((owner) => (
      assert.equal(owner, accounts[0])
    ))
  })
})