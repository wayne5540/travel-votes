const LunchVote = artifacts.require("./LunchVote.sol")
import expectThrow from './helpers/expectThrow';
import assertJump from './helpers/assertJump';

contract('LunchVote', (accounts) => {
  let lunchVote;
  const resultEnum = {
    Success: 0,
    Failed: 1,
    Even: 2
  }

  beforeEach(async function () {
    lunchVote = await LunchVote.new();
  });


  it("sets sender as owner", async () => {
    const owner = await lunchVote.owner()

    assert.equal(owner, accounts[0])
  })

  describe("getVotors", () => {
    it("return voters", async () => {
      const voters = await lunchVote.getVoters()

      assert.isArray(voters)
    })
  })

  describe('vote', () => {
    it("adds voter", async () => {
      await lunchVote.vote(true)
      const voters = await lunchVote.getVoters()

      assert.include(voters, accounts[0])
    })

    it("adds agreementCount if support", async () => {
      await lunchVote.vote(true)
      const count = await lunchVote.agreementCount()

      assert.equal(count, 1)
    })

    it("doesn't adds agreementCount if support", async () => {
      await lunchVote.vote(false)
      const count = await lunchVote.agreementCount()

      assert.equal(count, 0)
    })

    it("can't vote more than once", async () => {
      await lunchVote.vote(true)

      await expectThrow(
        lunchVote.vote(true)
      )
    })
  })

  describe('close', () => {
    const newTitle = "Restuarant in front of our office";

    beforeEach(async function () {
      await lunchVote.start(newTitle)
    });

    it("toggles inProgress as false", async () => {
      await lunchVote.close()
      const inProgress = await lunchVote.inProgress()

      assert.isFalse(inProgress)
    })

    describe('sets result', () => {
      it("even", async () => {
        await lunchVote.close()
        const result = await lunchVote.result()

        assert.equal(result, resultEnum.Even)
      })

      it("faied", async () => {
        await lunchVote.vote(false)
        await lunchVote.close()
        const result = await lunchVote.result()

        assert.equal(result, resultEnum.Failed)
      })

      it("success", async () => {
        await lunchVote.vote(true)
        await lunchVote.close()
        const result = await lunchVote.result()

        assert.equal(result, resultEnum.Success)
      })
    })
  })

  describe('start', () => {
    const newTitle = "Restuarant in front of our office";

    it("toggles inProgress as true", async () => {
      await lunchVote.start(newTitle)
      const inProgress = await lunchVote.inProgress()

      assert.isTrue(inProgress)
    })

    it("sets vote title", async () => {
      await lunchVote.start(newTitle)
      const contractTitle = await lunchVote.title()

      assert.equal(contractTitle, newTitle)
    })

    it("only togglable when not in process", async () => {
      await lunchVote.start(newTitle)

      await expectThrow(
        lunchVote.start(newTitle)
      )
    })

    describe('ownable', () => {
      it('should prevent non-owners from transfering', async function () {
        const other = accounts[2];
        const owner = await lunchVote.owner.call();
        assert.isTrue(owner !== other);
        try {
          await lunchVote.start(newTitle, { from: other });
          assert.fail('should have thrown before');
        } catch (error) {
          assertJump(error);
        }
      });
    })
  })
})