// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {StorageSlot} from "@openzeppelin/contracts/utils/StorageSlot.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BoxV1 {
    function initialize() public {}

    function print() public pure returns (string memory) {
        return "Box V1";
    }
}

contract BoxV2 {
    function print() public pure returns (string memory) {
        return "Box V2";
    }
}

contract CollisionV1 {
    uint256 public x;
    uint256 public y;

    function initialize() public {
        x = 1;
        y = 0;
    }
}

contract CollisionV2 {
    using StorageSlot for bytes32;

    uint256 public y;
    uint256 public x;

    function addX() public {
        x = x + 1;
    }
}
