const LunchVote = artifacts.require("./LunchVote.sol")
import expectThrow from './helpers/expectThrow';

contract('LunchVote', (accounts) => {
  let lunchVote;

  beforeEach(async function () {
    lunchVote = await LunchVote.new();
  });


  it("sets sender as owner", async () => {
    let owner = await lunchVote.owner()

    assert.equal(owner, accounts[0])
  })

  describe('startVote', () => {
    it("toggles inProgress as true", async () => {
      await lunchVote.startVote()
      let inProgress = await lunchVote.inProgress()

      assert.equal(inProgress, true)
    })

    it("only togglable when not in process", async () => {
      await lunchVote.startVote()

      await expectThrow(
        lunchVote.startVote()
      )
    })
  })
})