
## Done

## Contract Features

### 所有人

- [v] 可以新增要去的地點提案
- [v] 可以投票參與（一個地點限一票）
- [v] 可以看到每個提案目前參與和不參與的人數

### 提案發起人

- [v] 可以結束提案
- [v] 一但提案結束，不允許任何人再投票


## TODOs

## Features

- [] (Client) Contract owner 可以刪除提案
- [] (Contract) Contract owner 可以刪除提案
- [] (Client) Proposal creator 可以結束 Proposal

## Bugs

- [] 重新整理頁面會先 render component 才找到 window.web3
  - `Uncaught (in promise) TypeError: Cannot read property 'apply' of undefined`

## Improvements

- [] Testnet 反應很慢，UI 要有 loading 的反饋
  - [] create proposal 時
  - [] vote 時
- [] create proposa 的 form 可以做 validation
- [] 加上 proposal 在 chain 上的狀態的圖樣，現在只有顏色區分
- [] Contract 加上 Event
  - [] Client 監聽 Events
    - [] CreateProposal
    - [] Vote

## Other Notes

```
testrpc

truffle compile

truffle migrate

truffle deploy
```


Deploy to testnet

http://faucet.ropsten.be:3001/

```
geth --testnet --rpc --datadir /usr/local/var/ethereum-testnet-data console 2>> /usr/local/var/log/geth.testnet.log

personal.unlockAccount(eth.accounts[2], "11111111")

miner.setEtherbase(eth.accounts[2])

truffle migrate --network ropsten
```


```sh
geth --testnet --rpc --datadir /usr/local/var/ethereum-testnet-data console 2>> /usr/local/var/log/geth.testnet.log
```


```sh
#!/bin/bash
geth --fast --testnet --rpc --rpcapi "eth,net,web3,personal" \
     --preload "scripts/utils.js,scripts/custom.js" \
     --datadir /usr/local/var/ethereum-testnet-data console 2>> /usr/local/var/log/geth.testnet.log
```


## Client

https://scotch.io/tutorials/setup-a-react-environment-using-webpack-and-babel

```sh
yarn start
```
https://webpack.js.org/guides/production/

## Web3

web3.eth.sendTransaction({from: web3.eth.accounts[2], to: '0x56C60909FEfDDdEE4F13D55e51c562b81A471f80', value: web3.toWei(2, "ether")})

truffle console

TravelVote.deployed().then(function(instance) { instance.createProposal("Disney Land!") } )


## Testnet

contract: 0xc3459e2fdfb715fabf19374b07927e42c8b2839d