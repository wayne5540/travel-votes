# Travel votes

A ethereum contract written in Sodility for practicing.

## Contract features

### 所有人

- [v] 可以新增要去的地點提案
- [v] 可以投票參與（一個地點限一票）
- [v] 可以看到每個提案目前參與和不參與的人數

### 提案發起人

- [v] 可以結束提案
- [v] 一但提案結束，不允許任何人再投票

## Client features

### 所有人

- [v] 可以新增要去的地點提案
- [v] 可以投票參與（一個地點限一票）
- [v] 可以看到每個提案目前參與和不參與的人數

### 提案發起人

- [] 可以結束提案
- [] 一但提案結束，不允許任何人再投票

## Getting Started

install npm and [truffle](https://github.com/trufflesuite/truffle) `npm install -g truffle`

install yarn (not required)

```
git clone https://github.com/wayne5540/travel-votes.git
cd travel-vote
yarn install
```

Running client:

install [testrpc](https://github.com/ethereumjs/testrpc) `npm install -g ethereumjs-testrpc`

Install [metamask](https://metamask.io/)(Chrome) or [mist](https://github.com/ethereum/mist/releases)

```
testrpc
truffle compile
truffle migrate
yarn start
```

Switch your wallet using local node 8545 port

Go to `localhost:8080` and play around

### Interact your deployed contract with truffle console

Example

**create new proposal from console**

```
TravelVote.deployed().then(function(instance) { instance.createProposal("Disney Land!") } )
```

### Test

```
truffle test
```

## Trouble Shooting

### I don't have eth in my wallet

**under testrpc (local node)**

run those commands, it will send 2 ether to your test wallet

```
truffle console

web3.eth.sendTransaction({from: web3.eth.accounts[2], to: 'YOUR_ETH_ADDRESS', value: web3.toWei(2, "ether")})
```

**under ropsten testnet**

Go to http://faucet.ropsten.be:3001/ and get some eth to your address


## Deployment

Since this project use Ethereum as "database", you can deploy contract to testnet or main chain at your local, and serve client code into any web server.

### Deploy to testnet (or Main chain)

You need to sync testnet node first before you deploy, the easiest way to do this is by using [geth](https://github.com/ethereum/go-ethereum/wiki/geth) or [parity](https://github.com/paritytech/parity) to sync node, example here are using `geth`

**create account under testnet**

https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts

**deploy**

In first console
```
geth --testnet --rpc --datadir /usr/local/var/ethereum-testnet-data console 2>> /usr/local/var/log/geth.testnet.log

personal.unlockAccount(eth.accounts[0], "YOUR_ACCOUNT_PASSWORD", 36000)
```

In another console
```
truffle migrate --network ropsten
```

All done.

