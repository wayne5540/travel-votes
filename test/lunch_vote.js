const LunchVote = artifacts.require("./LunchVote.sol")
import expectThrow from './helpers/expectThrow';
import assertJump from './helpers/assertJump';

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

    describe('ownable', () => {
      it('should prevent non-owners from transfering', async function () {
        const other = accounts[2];
        const owner = await lunchVote.owner.call();
        assert.isTrue(owner !== other);
        try {
          await lunchVote.startVote({ from: other });
          assert.fail('should have thrown before');
        } catch (error) {
          assertJump(error);
        }
      });
    })
  })
})