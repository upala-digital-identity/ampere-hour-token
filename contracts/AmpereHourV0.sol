pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract AmpereHourV0 is OwnableUpgradeable, ERC20Upgradeable {

    bool isTransferable;

    function initialize() initializer public {
        __Ownable_init();
        __ERC20_init_unchained("AmpereHour", "Ah");
        isTransferable = false;
    }

    /**
     * @dev throws if token transfers are not allowed yet by the owner
     */
    modifier onlyTransfeable() {
        require(isTransferable == true, "Transfers not allowed yet");
        _;
    }

    /**
     * @dev mints new tokens to the specified address - only available to the owner
     */
    function mint(address account, uint256 amount) public onlyOwner {
        // _mint(account, amount);
    }

    /**
     * @dev standard transfer function, but switched off untill transfers are allowed
     */
    function transfer(address recipient, uint256 amount) public override onlyTransfeable returns (bool) {
        _transfer(_msgSender(), recipient, amount);
    }

    /**
     * @dev allow token transfers - only available to the owner
     */
    function adminEnableTransfers(bool allowTransfers) public onlyOwner {
        isTransferable = allowTransfers;
    }
}