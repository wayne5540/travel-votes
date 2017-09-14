require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      network_id: "3",
      host: "localhost",
      port: 8545,
      gas: 2900000,
      from: '0x5f9c61c00d71a26867e2fcda667d1b12a450f568'
    }
  }
};
