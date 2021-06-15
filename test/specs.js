const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

let AmpereHourV0;
let AmpereHourV1;

describe("Ah token", function() {

  before('set', async () => {
    AmpereHourV0 = await ethers.getContractFactory("AmpereHourV0");
    AmpereHourV1 = await ethers.getContractFactory("AmpereHourV1");
    })
  
  it("Should return the new greeting once it's changed", async function() {
    
    const ah = await upgrades.deployProxy(AmpereHourV0);
    await ah.deployed();

    // upgrade
    const Ah = await upgrades.upgradeProxy(ah.address, AmpereHourV1);
    console.log(Ah.address)

    // mint
    const upgraded = await AmpereHourV1.attach(ah.address);
    await upgraded.mint(ah.address, 1);
    
    expect(await upgraded.balanceOf(ah.address)).to.be.equal("0x01");
  });
});
