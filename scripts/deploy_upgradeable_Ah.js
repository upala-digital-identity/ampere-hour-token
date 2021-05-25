const { ethers, upgrades } = require("hardhat");

async function main() {
  const AmpereHourV1 = await ethers.getContractFactory("AmpereHourV1");
  console.log("Deploying AmpereHourV1...");
  const ah = await upgrades.deployProxy(AmpereHourV1);
  await ah.deployed();
  console.log("AmpereHourV1 deployed to:", ah.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });