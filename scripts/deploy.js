// scripts/create-box.js
const { ethers, upgrades } = require("hardhat");


async function main() {
  const Box = await ethers.getContractFactory("BoxV1");
  let box = await upgrades.deployProxy(Box, []);
  await box.waitForDeployment();
  let boxAddress = await box.getAddress();
  console.log("Box deployed to:", boxAddress);
  console.log("Print:", await box.print());

  //!Upgrade
  const BoxV2 = await ethers.getContractFactory("BoxV2");
  box = await upgrades.upgradeProxy(boxAddress, BoxV2);
  boxAddress = await box.getAddress();
  console.log("Box deployed to:", boxAddress);
  console.log("Print:", await box.print());
}



main();
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
