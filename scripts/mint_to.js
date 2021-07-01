const { ethers } = require("hardhat");
const { BigNumber, provider } = require("ethers");
const oneETH = BigNumber.from(10).pow(18);
const deployedAddress = "0xeed9D0f7265892e84e43d05dA464c75add199260";


async function main() {
  wallets = await ethers.getSigners();
  [owner,user1] = wallets;
  console.log("from address:", owner.address);

  for (var key in wallets) {
    console.log(wallets[key].address);
  }
  const AmpereHourV1 = await ethers.getContractFactory("AmpereHourV1");
  const Ah = await AmpereHourV1.attach(deployedAddress); 

  const mintTo = {
    "0xa88630300706488e9d31597ccC4394206F4D4C6C": oneETH.mul(1),
    // "0x59a7f0779829bf51dbb1ecd9db873b6a2cf57f42": oneETH.mul(3),
  }

  for (var key in mintTo) {
    const tx = await Ah.mint(key, mintTo[key]);
    const receipt = await tx.wait(1);
    console.log(receipt.transactionHash, "\( confirmations:", receipt.confirmations, "\)");
  }



  // await Ah.adminAllowTransfers(false);
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });