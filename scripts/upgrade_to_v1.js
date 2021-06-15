const { ethers, upgrades } = require("hardhat");

async function main() {
  const AmpereHourV1 = await ethers.getContractFactory("AmpereHourV1");
  console.log("Upgrading AmpereHour...");
  const box = await upgrades.upgradeProxy("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", AmpereHourV1);
  console.log("AmpereHour upgraded");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });