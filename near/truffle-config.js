require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  contracts_build_directory: "./client/contracts",
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    near: {
    provider: function () {
      return new HDWalletProvider(process.env.PRIVATE_KEY, process.env.NEAR_RPC_URL);
    },
    network_id: 11155111,
    skipDryRun: true,
  },
  }, 
  compilers: {
    solc: {
      version: "0.8.5",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
  db: {
    enabled: false
  }
};