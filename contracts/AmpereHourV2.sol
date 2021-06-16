pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract AmpereHourV2 is OwnableUpgradeable, ERC20Upgradeable {

    bool public transfersAllowed;

    function initialize() initializer public {
        __Ownable_init();
        __ERC20_init_unchained("AmpereHour", "Ah");
        transfersAllowed = false;
    }

    /**
     * @dev throws if token transfers are not allowed yet by the owner
     */
    modifier onlyTransferable() {
        require(transfersAllowed == true, "Transfers not allowed yet");
        _;
    }

    /**
     * @dev mints new tokens to the specified address - only available to the owner
     */
    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    /**
     * @dev standard transfer function, but switched off untill transfers are allowed
     */
    function transfer(address recipient, uint256 amount) public override onlyTransferable returns (bool) {
        super._transfer(_msgSender(), recipient, amount);
        // return true;
    }

    /**
     * @dev allow token transfers - only available to the owner
     */
    function adminAllowTransfers(bool allowTransfers) public onlyOwner {
        transfersAllowed = allowTransfers;
    }
}