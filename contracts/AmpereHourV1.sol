pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract AmpereHour is ERC20Upgradeable {
    constructor(uint256 initialSupply) ERC20Upgradeable("AmpereHour", "Ah") {
        _mint(msg.sender, initialSupply);
    }
}