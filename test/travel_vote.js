const TravelVote = artifacts.require("./TravelVote.sol")
import expectThrow from './helpers/expectThrow';
import assertJump from './helpers/assertJump';

contract('TravelVote', (accounts) => {
  const destination = "Disney Land"
  let travelVote;
  const proposalStruct = {
    destination: 0,
    creator: 1,
    voteCount: 2,
    yesCount: 3,
    noCount: 4
  }
  const voteType = {
    Yes: 0,
    No: 1
  }

  beforeEach(async function () {
    travelVote = await TravelVote.new();
  });

  it("sets sender as owner", async () => {
    const owner = await travelVote.owner()

    assert.equal(owner, accounts[0])
  })

  describe("createProposal", () => {
    beforeEach(async function () {
      await travelVote.createProposal(destination)
    });

    it("creates proposal", async () => {
      const proposal = await travelVote.proposals(0)
      const proposedDestination = proposal[proposalStruct.destination]

      assert.equal(proposedDestination, destination)
    })

    it("sets creator as msg sender", async () => {
      const proposal = await travelVote.proposals(0)
      const creator = proposal[proposalStruct.creator]

      assert.equal(creator, accounts[0])
    })

    it("sets voteCount to eq 0", async () => {
      const proposal = await travelVote.proposals(0)
      const count = proposal[proposalStruct.voteCount]

      assert.equal(count, 0)
    })
  })

  describe("vote", () => {
    beforeEach(async function () {
      await travelVote.createProposal(destination)
    });

    it("add proposals into voted histroy", async () => {
      const proposalIndex = 0
      await travelVote.vote(proposalIndex, voteType.Yes)

      const voter = await travelVote.getVoter(accounts[0])
      const proposalIndexes = Object.keys(voter[1]).map((key) => (parseInt(key)))

      assert.include(proposalIndexes, proposalIndex)
    })

    it("increment voteCount and yesCount if vote Yes", async () => {
      const proposalIndex = 0
      await travelVote.vote(proposalIndex, voteType.Yes)

      const proposal = await travelVote.proposals(proposalIndex)

      assert.equal(parseInt(proposal[proposalStruct.voteCount]), 1)
      assert.equal(parseInt(proposal[proposalStruct.yesCount]), 1)
      assert.equal(parseInt(proposal[proposalStruct.noCount]), 0)
    })

    it("increment voteCount and noCount if vote No", async () => {
      const proposalIndex = 0
      await travelVote.vote(proposalIndex, voteType.No)

      const proposal = await travelVote.proposals(proposalIndex)

      assert.equal(parseInt(proposal[proposalStruct.voteCount]), 1)
      assert.equal(parseInt(proposal[proposalStruct.yesCount]), 0)
      assert.equal(parseInt(proposal[proposalStruct.noCount]), 1)
    })
  })



  // let travelVote;
  // const resultEnum = {
  //   Success: 0,
  //   Failed: 1,
  //   Even: 2
  // }

  // beforeEach(async function () {
  //   travelVote = await TravelVote.new();
  // });


  // it("sets sender as owner", async () => {
  //   const owner = await travelVote.owner()

  //   assert.equal(owner, accounts[0])
  // })

  // describe("getVotors", () => {
  //   it("return voters", async () => {
  //     const voters = await travelVote.getVoters()

  //     assert.isArray(voters)
  //   })
  // })

  // describe('vote', () => {
  //   it("adds voter", async () => {
  //     await travelVote.vote(true)
  //     const voters = await travelVote.getVoters()

  //     assert.include(voters, accounts[0])
  //   })

  //   it("adds agreementCount if support", async () => {
  //     await travelVote.vote(true)
  //     const count = await travelVote.agreementCount()

  //     assert.equal(count, 1)
  //   })

  //   it("doesn't adds agreementCount if support", async () => {
  //     await travelVote.vote(false)
  //     const count = await travelVote.agreementCount()

  //     assert.equal(count, 0)
  //   })

  //   it("can't vote more than once", async () => {
  //     await travelVote.vote(true)

  //     await expectThrow(
  //       travelVote.vote(true)
  //     )
  //   })
  // })

  // describe('close', () => {
  //   const newTitle = "Restuarant in front of our office";

  //   beforeEach(async function () {
  //     await travelVote.start(newTitle)
  //   });

  //   it("toggles inProgress as false", async () => {
  //     await travelVote.close()
  //     const inProgress = await travelVote.inProgress()

  //     assert.isFalse(inProgress)
  //   })

  //   describe('sets result', () => {
  //     it("even", async () => {
  //       await travelVote.close()
  //       const result = await travelVote.result()

  //       assert.equal(result, resultEnum.Even)
  //     })

  //     it("faied", async () => {
  //       await travelVote.vote(false)
  //       await travelVote.close()
  //       const result = await travelVote.result()

  //       assert.equal(result, resultEnum.Failed)
  //     })

  //     it("success", async () => {
  //       await travelVote.vote(true)
  //       await travelVote.close()
  //       const result = await travelVote.result()

  //       assert.equal(result, resultEnum.Success)
  //     })
  //   })
  // })

  // describe('start', () => {
  //   const newTitle = "Restuarant in front of our office";

  //   it("toggles inProgress as true", async () => {
  //     await travelVote.start(newTitle)
  //     const inProgress = await travelVote.inProgress()

  //     assert.isTrue(inProgress)
  //   })

  //   it("sets vote title", async () => {
  //     await travelVote.start(newTitle)
  //     const contractTitle = await travelVote.title()

  //     assert.equal(contractTitle, newTitle)
  //   })

  //   it("only togglable when not in process", async () => {
  //     await travelVote.start(newTitle)

  //     await expectThrow(
  //       travelVote.start(newTitle)
  //     )
  //   })

  //   describe('ownable', () => {
  //     it('should prevent non-owners from transfering', async function () {
  //       const other = accounts[2];
  //       const owner = await travelVote.owner.call();
  //       assert.isTrue(owner !== other);
  //       try {
  //         await travelVote.start(newTitle, { from: other });
  //         assert.fail('should have thrown before');
  //       } catch (error) {
  //         assertJump(error);
  //       }
  //     });
  //   })
  // })
})