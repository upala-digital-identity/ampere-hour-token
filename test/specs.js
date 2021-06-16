const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");


describe("Ah token", function() {

  before('set', async () => {
      AmpereHourV1 = await ethers.getContractFactory("AmpereHourV1");
      AmpereHourV2 = await ethers.getContractFactory("AmpereHourV2");
      wallets = await ethers.getSigners();
      [deployer,user1,user2,nobody] = wallets;
      console.log("      deployer address:", deployer.address);

      // deploy
      ah1 = await upgrades.deployProxy(AmpereHourV1);
      await ah1.deployed();
      // upgrade
      await upgrades.upgradeProxy(ah1.address, AmpereHourV2);
      // ah2 = await AmpereHourV2.attach(ah1.address);  // will be needed if the ABI changes
    })


  it("Only owner can mint", async function() {
    await expect(ah1.connect(nobody).mint(ah1.address, 1)).to.be.revertedWith(
      'Ownable: caller is not the owner'
    );
    const randomAddr = "0x8aB631AE7780e24CCA27EC3DE7F64800ba4848E2";
    await ah1.mint(randomAddr, 1).then((tx) => tx.wait());
    expect(await ah1.balanceOf(randomAddr)).to.be.equal("0x01");
  });

  it("Transfers are not allowed", async function() {
    expect(await ah1.transfersAllowed()).to.be.equal(false);
    await expect(ah1.connect(user1).transfer(user2.address, 1)).to.be.revertedWith(
      'Transfers not allowed yet'
    );
  });

  it("Only owner can turn on transfers", async function() {
    await expect(ah1.connect(nobody).adminAllowTransfers(true)).to.be.revertedWith(
      'Ownable: caller is not the owner'
    );
    await expect(ah1.connect(user1).transfer(user2.address, 1)).to.be.revertedWith(
      'Transfers not allowed yet'
    );

    await ah1.connect(deployer).adminAllowTransfers(true).then((tx) => tx.wait());
    expect(await ah1.transfersAllowed()).to.be.equal(true);
    await ah1.mint(user1.address, 1).then((tx) => tx.wait());
    const randomAddr = "0x59a7f0779829bf51dbb1ecd9db873b6a2cf57f42";
    await ah1.connect(user1).transfer(randomAddr, 1).then((tx) => tx.wait());
    expect(await ah1.balanceOf(randomAddr)).to.be.equal("0x01");
  });

  it("Only owner can turn OFF transfers", async function() {
    await ah1.connect(deployer).adminAllowTransfers(false).then((tx) => tx.wait());
    expect(await ah1.transfersAllowed()).to.be.equal(false);
    await ah1.mint(user1.address, 1).then((tx) => tx.wait());
    const randomAddr = "0x59a7f0779829bf51dbb1ecd9db873b6a2cf57f42";
    await expect(ah1.connect(user1).transfer(randomAddr, 1)).to.be.revertedWith(
      'Transfers not allowed yet'
    );
  });


});
