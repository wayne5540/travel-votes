# Travel votes

A ethereum contract written in Sodility for practicing.

![](demo.gif)

## Getting Started


Requirements:


* 至少要安裝 yarn 或是 npm 
* Chrome 要有 [metamask](https://metamask.io/)(Chrome) 或是 [mist](https://github.com/ethereum/mist/releases)



### 步驟

- 先把 Metamask 切換到 testnet，建立一個 testnet 的 Account
- 到 http://faucet.ropsten.be:3001/ 拿一點 eth 匯到 Metamask testnet 的 Account
- 跑以下 commands

```
git clone https://github.com/wayne5540/travel-votes.git
cd travel-vote
git checkout demo
yarn install
yarn start
```

- 到 `localhost:8080` 就可以看到了


目前有個 bug 就是有時候會抓不到 contract address，如果看到 contract address 和 owner 是 fetching 狀態請重開新的 tab 進 localhost:8080 直到可以看到 contract 為止
