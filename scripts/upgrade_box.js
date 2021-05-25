const { ethers, upgrades } = require("hardhat");

async function main() {
  const AmpereHourV2 = await ethers.getContractFactory("AmpereHourV2");
  console.log("Upgrading AmpereHour...");
  const box = await upgrades.upgradeProxy("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", AmpereHourV2);
  console.log("AmpereHour upgraded");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });