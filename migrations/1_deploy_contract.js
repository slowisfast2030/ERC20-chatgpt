var ERC20 = artifacts.require("ERC20");

module.exports = function(deployer) {
  deployer.deploy(ERC20, 'LinusToken', 'LTK', 2, 1000);
};