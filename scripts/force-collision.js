const { ethers } = require("hardhat");

async function main() {
  [deployer, owner, user] = await ethers.getSigners();
  const CollisionV1 = await ethers.getContractFactory("CollisionV1");
  const v1 = await CollisionV1.deploy();
  const v1Address = await v1.getAddress();

  const CollisionV2 = await ethers.getContractFactory("CollisionV2");
  const v2 = await CollisionV2.deploy();
  const v2Address = await v2.getAddress();

  //Note: Deploy proxy admin
  const ProxyAdminFactory = await ethers.getContractFactory(
    "TransparentProxyAdmin"
  );
  const proxyAdmin = await ProxyAdminFactory.deploy();
  const proxyAdminAddress = await proxyAdmin.getAddress();

  //Note: Encode initialize function
  const data = v1.interface.encodeFunctionData("initialize", []);

  //Note: Deploy proxy
  const ProxyFactory = await ethers.getContractFactory(
    "TransparentUpgradeableProxy"
  );
  let proxy = await ProxyFactory.connect(deployer).deploy(
    v1Address,
    proxyAdminAddress,
    data
  );

  //Note: Print
  const proxyAddress = await proxy.getAddress();
  proxy = CollisionV1.attach(proxyAddress);
  console.log("Version 1");
  console.log(`x: ${await proxy.x()}, y: ${await proxy.y()}`);

  //Note: Upgrade
  await proxyAdmin.connect(deployer).upgrade(proxyAddress, v2Address);
  console.log("===============AFTER UPGRADE====================");

  //Note: Print
  proxy = CollisionV2.attach(proxyAddress);

  console.log("Version 2");
  console.log(`x: ${await proxy.x()}, y: ${await proxy.y()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
