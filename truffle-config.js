// npm install dotenv
// npm install @truffle/hdwallet-provider

require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

//to fetch these keys from .env file
const privateKey = process.env.SEPOLIA_PRIVATE_KEY;
const mnemonic = process.env.NMEMONIC;


module.exports = {

  networks: {
  
    ganache: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      gas: 1200000,
      gasPrice: 15000000000,
     },

    sepolia: { 
			network_id: "11155111",
			provider: () => new HDWalletProvider(mnemonic, 'https://sepolia.infura.io/v3/9faf676500e24b3693d74249d8c8412c'),
			gas: 4600000,
      from: '0xCA8415E9C49C69CAC55d640AA752cfe95Aeca071', // linus
      // from: '0x7529a3FA1934AdF47258937443196567AaB43Ac5', // lmz
    },

    goerli: { 
			network_id: "5",
			provider: () => new HDWalletProvider(mnemonic, 'https://goerli.infura.io/v3/9faf676500e24b3693d74249d8c8412c'),
			gas: 460000,
      from: '0x7529a3FA1934AdF47258937443196567AaB43Ac5',
    },

    mainnet: { 
			network_id: "1",
			provider: () => new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/v3/9faf676500e24b3693d74249d8c8412c'),
			gas: 460000,
      from: '0x7529a3FA1934AdF47258937443196567AaB43Ac5',
    }

  },

  compilers: {
    solc: {
      //version: "^0.5.0"
    }
  }
};