// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

contract TransparentProxy is TransparentUpgradeableProxy {
    constructor(address _logic, address _admin, bytes memory _data)
        payable
        TransparentUpgradeableProxy(_logic, _admin, _data)
    {}
}

contract TransparentProxyAdmin is ProxyAdmin {
    constructor() {}
}
