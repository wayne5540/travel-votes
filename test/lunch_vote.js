const LunchVote = artifacts.require("./LunchVote.sol")
import expectThrow from './helpers/expectThrow';

contract('LunchVote', (accounts) => {
  it("sets sender as owner", async () => {
    let instance = await LunchVote.deployed()
    let owner = await instance.owner()

    return assert.equal(owner, accounts[0])
  }) 

  // describe('startVote', () => {
  //   it("toggles inProgress as true", () => {
  //     return LunchVote.deployed().then((instance) => {
  //       instance.startVote()
  //       return instance.inProgress();
  //     }).then((inProgress) => (
  //       assert.equal(inProgress, true)
  //     ))
  //   })

  //   it("only toggable when not in progress", () => {
  //     return LunchVote.deployed().then((instance) => {
  //       instance.startVote()
  //       return instance;
  //     }).then((instance) => {
  //       instance.startVote()
  //       return instance.inProgress();
  //     }).then((inProgress) => (
  //       assert.equal(inProgress, true)
  //     ))
  //   })
  // })

  // it("toggles inProgress as true", () => {
  //   LunchVote.deployed().then((instance) => {
  //     instance.startVote()
  //     return instance;
  //   }).then((instance) => (
  //     instance.inProgress()
  //   )).then((inProgress) => (
  //     assert.equal("inProgress", "123")
  //   ))
  // })
})