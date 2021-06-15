const { ethers, upgrades } = require("hardhat");

async function main() {


  // // Create a Frame connection
  // const ethProvider = require('eth-provider') // eth-provider is a simple EIP-1193 provider
  // const frame = ethProvider('frame') // Connect to Frame

  // // Use `getDeployTransaction` instead of `deploy` to return deployment data
  // const AmpereHourV1 = await ethers.getContractFactory("AmpereHourV0");
  // const tx = await AmpereHourV1.getDeployTransaction()
 
  // // Set `tx.from` to current Frame account
  // tx.from = (await frame.request({ method: 'eth_requestAccounts' }))[0]
  
  // // Sign and send the transaction using Frame
  // await frame.request({ method: 'eth_sendTransaction', params: [tx] })


  const AmpereHourV1 = await ethers.getContractFactory("AmpereHourV0");
  console.log("Deploying AmpereHourV0...");
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