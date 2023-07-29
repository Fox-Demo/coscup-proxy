// scripts/create-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const CollisionV1 = await ethers.getContractFactory("CollisionV1");
  let collision = await upgrades.deployProxy(CollisionV1, []);
  await collision.waitForDeployment();
  let collisionAddress = await collision.getAddress();
  console.log("Box deployed to:", collisionAddress);
  console.log("Print:", await collision.x());

  //Note: Upgrade
  const CollisionV2 = await ethers.getContractFactory("CollisionV2");
  collision = await upgrades.upgradeProxy(collisionAddress, CollisionV2); //! ERROR!!
}
main();
