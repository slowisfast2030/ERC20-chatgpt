const BN = require('bn.js');

const ERC20 = artifacts.require("ERC20");

contract("ERC20", accounts => {
  let erc20;

  before(async () => {
    erc20 = await ERC20.deployed();
  });

  it("should have correct name, symbol, decimals and totalSupply", async () => {
    const name = await erc20.name();
    const symbol = await erc20.symbol();
    const decimals = await erc20.decimals();
    const totalSupply = await erc20.totalSupply();
    assert.equal(name, "MyToken");
    assert.equal(symbol, "MTK");
    assert.equal(decimals, 2);
    assert.equal(totalSupply, 1000000 * 10 ** 2);
  });

  it("should transfer tokens between accounts", async () => {
    const from = accounts[0];
    const to = accounts[1];
    const value = 1000 * 10 ** 2;
    const balanceBeforeFrom = await erc20.balanceOf(from);
    const balanceBeforeTo = await erc20.balanceOf(to);
    await erc20.transfer(to, value, { from });
    const balanceAfterFrom = await erc20.balanceOf(from);
    const balanceAfterTo = await erc20.balanceOf(to);
    assert.equal((balanceBeforeFrom - value).toString(), balanceAfterFrom.toString());
    // assert.equal(balanceBeforeTo + value, balanceAfterTo); // 报错
    assert.equal(balanceBeforeTo.add(new BN(value)).toString(), balanceAfterTo.toString());
  });

  it("should approve and transferFrom tokens between accounts", async () => {
    const owner = accounts[0];
    const spender = accounts[1];
    const to = accounts[2];
    const value = 1000 * 10 ** 2;
    const balanceBeforeOwner = await erc20.balanceOf(owner);
    const balanceBeforeTo = await erc20.balanceOf(to);
    await erc20.approve(spender, value, { from: owner });
    await erc20.transferFrom(owner, to, value, { from: spender });
    const balanceAfterOwner = await erc20.balanceOf(owner);
    const balanceAfterTo = await erc20.balanceOf(to);
    assert.equal((balanceBeforeOwner - value).toString(), balanceAfterOwner.toString());
    //assert.equal(balanceBeforeTo + value, balanceAfterTo); // 报错
    assert.equal(balanceBeforeTo.add(new BN(value)).toString(), balanceAfterTo.toString());
  });
});

// 这将使用 `add()` 函数将 `balanceBeforeTo` 和 `value` 相加，然后将其转换为字符串进行比较。
// 此外，您需要在测试脚本开头添加以下导入语句，以便使用 `BN` 类型：
// const BN = require('bn.js');
