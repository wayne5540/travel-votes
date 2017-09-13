# Travel votes

A ethereum contract written in Sodility for practicing.

## Features

### 所有人

- [v] 可以新增要去的地點提案
- [v] 可以投票參與（一個地點限一票）
- [v] 可以看到每個提案目前參與和不參與的人數

### 提案發起人

- [v] 可以結束提案
- [v] 一但提案結束，不允許任何人再投票

### As contract owner

- [] 可以刪除提案

## Development

```
testrpc

truffle compile

truffle migrate

truffle deploy
```


Deploy to testnet
```
geth --testnet --rpc --datadir /usr/local/var/ethereum-testnet-data console 2>> /usr/local/var/log/geth.testnet.log

personal.unlockAccount(eth.accounts[2])

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


### Client

https://scotch.io/tutorials/setup-a-react-environment-using-webpack-and-babel

### Web3

web3.eth.sendTransaction({from: web3.eth.accounts[0], to: '0x56C60909FEfDDdEE4F13D55e51c562b81A471f80', value: web3.toWei(2, "ether")})



0xcf201e6c6ebb361201cb3d7ac2ebdfa9ea9847cd