var ERC20 = artifacts.require("ERC20");

module.exports = function(deployer) {
  deployer.deploy(ERC20, 'MyToken', 'MTK', 2, 1000000);
};