const LunchVote = artifacts.require("./LunchVote.sol")
import expectThrow from './helpers/expectThrow';
import assertJump from './helpers/assertJump';

contract('LunchVote', (accounts) => {
  let lunchVote;

  beforeEach(async function () {
    lunchVote = await LunchVote.new();
  });


  it("sets sender as owner", async () => {
    const owner = await lunchVote.owner()

    assert.equal(owner, accounts[0])
  })

  describe('startVote', () => {
    const newTitle = "Restuarant in front of our office";

    it("toggles inProgress as true", async () => {
      await lunchVote.startVote(newTitle)
      const inProgress = await lunchVote.inProgress()

      assert.equal(inProgress, true)
    })

    it("sets vote title", async () => {
      await lunchVote.startVote(newTitle)
      const contractTitle = await lunchVote.title()

      assert.equal(contractTitle, newTitle)
    })

    it("only togglable when not in process", async () => {
      await lunchVote.startVote(newTitle)

      await expectThrow(
        lunchVote.startVote(newTitle)
      )
    })

    describe('ownable', () => {
      it('should prevent non-owners from transfering', async function () {
        const other = accounts[2];
        const owner = await lunchVote.owner.call();
        assert.isTrue(owner !== other);
        try {
          await lunchVote.startVote(newTitle, { from: other });
          assert.fail('should have thrown before');
        } catch (error) {
          assertJump(error);
        }
      });
    })
  })
})