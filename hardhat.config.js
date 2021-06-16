require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
const os = require('os');

const secrets = require(os.homedir() + "/gocrypt/dev/ah-token/Ah-mnemonic.js");
const gateway = require(os.homedir() + "/gocrypt/dev/ah-token/gateway.js");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
    rinkeby: {
      url: gateway.alchemy,
      accounts: {
        mnemonic: secrets.mnemonic
      },
      timeout: 200000,
    },
  },
  mocha: {
    timeout: 200000
  },
  solidity: "0.8.0",
};

