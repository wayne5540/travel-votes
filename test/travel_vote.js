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
    noCount: 4,
    isClosed: 5
  }
  const voteType = {
    Yes: 0,
    No: 1
  }

  beforeEach(async function () {
    travelVote = await TravelVote.new();
  })

  it("sets sender as owner", async () => {
    const owner = await travelVote.owner()

    assert.equal(owner, accounts[0])
  })

  describe("clodeProposal", () => {
    beforeEach(async function () {
      await travelVote.createProposal(destination)
    })

    it("closes proposal", async () => {
      const proposalIndex = 0
      await travelVote.closeProposal(proposalIndex)
      const proposal = await travelVote.proposals(proposalIndex)
      const isClosed = proposal[proposalStruct.isClosed]

      assert.isTrue(isClosed)
    })

    it("only creator can close proposal", async () => {
      const proposalIndex = 0
      await expectThrow(
        travelVote.closeProposal(proposalIndex, { from: accounts[1] })
      )
    })
  })

  describe("createProposal", () => {
    beforeEach(async function () {
      await travelVote.createProposal(destination)
    })

    it("creates proposal", async () => {
      const proposal = await travelVote.proposals(0)
      const proposedDestination = proposal[proposalStruct.destination]
      const creator = proposal[proposalStruct.creator]
      const count = proposal[proposalStruct.voteCount]
      const isClosed = proposal[proposalStruct.isClosed]

      assert.equal(proposedDestination, destination)
      assert.equal(creator, accounts[0])
      assert.equal(count, 0)
      assert.isFalse(isClosed)
    })
  })

  describe("vote", () => {
    beforeEach(async function () {
      await travelVote.createProposal(destination)
    });

    it("can't vote closed proposal", async () => {
      const proposalIndex = 0
      await travelVote.closeProposal(proposalIndex)

      await expectThrow(
        travelVote.vote(proposalIndex, voteType.Yes)
      )
    })

    it("can't vote twice", async () => {
      const proposalIndex = 0
      await travelVote.vote(proposalIndex, voteType.Yes)
      await expectThrow(
        travelVote.vote(proposalIndex, voteType.Yes)
      )
    })

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
})