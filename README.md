# Lunch votes

A ethereum contract written in Sodility for practicing.

## Features

### As an owner

- [] I can start a vote
- [] I can close a vote

### As a voter

- [] I can vote
- [] I can see vote result

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
