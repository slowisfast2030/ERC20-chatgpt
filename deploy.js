const Web3 = require('web3');
const { abi, bytecode } = require('./build/contracts/ERC20.json');

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545')); // 连接到本地节点
const privateKey = '241c72ca4da56962047c4487c76d28739081bd033d28046acf1c1253c42801a7'; // 填写部署账户的私钥
const account = web3.eth.accounts.privateKeyToAccount(privateKey).address;

const contract = new web3.eth.Contract(abi);
const name = 'MyToken';
const symbol = 'MTK';
const decimals = 18;
const totalSupply = web3.utils.toWei('1000000', 'ether');

(async function() {
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 3000000; // 填写所需的gasLimit
  const nonce = await web3.eth.getTransactionCount(account, 'pending');

  const tx = contract.deploy({
    data: bytecode,
    arguments: [name, symbol, decimals, totalSupply],
  }).encodeABI();

  const signedTx = await web3.eth.accounts.signTransaction({
    to: '',
    value: 0,
    gasPrice: gasPrice,
    gas: gasLimit,
    nonce: nonce,
    data: tx,
  }, privateKey);

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(`Contract deployed: ${receipt.contractAddress}`);
  console.log('all is well');
})();
