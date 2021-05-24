const { ethers, upgrades } = require("hardhat");

async function main() {
  const BoxV2 = await ethers.getContractFactory("BoxV2");
  console.log("Upgrading Box...");
  const box = await upgrades.upgradeProxy("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", BoxV2);
  console.log("Box upgraded");
}

main();