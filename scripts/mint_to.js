const { ethers } = require("hardhat");

async function main() {
  const AmpereHourV1 = await ethers.getContractFactory("AmpereHourV1");
  const Ah = await AmpereHourV1.attach(
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" // The deployed contract address
  );

  const mintTo = {
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0": 1,
    "0x1fE46736679d2D9a65F0992F2272dE9f3c7fa6e0": 2,
  }

  for (var key in mintTo) {
    await Ah.mint("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", mintTo[key]);
    console.log(await Ah.balanceOf("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"));
  }
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });