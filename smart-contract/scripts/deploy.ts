import { ethers } from "hardhat";

const main = async () =>{
  const Contract = await ethers.getContractFactory('CustomDex')
  const contract = await Contract.deploy()
  console.log("Deploying on Mumbai....")
  await contract.waitForDeployment()
  
  const address = await contract.getAddress()
  console.log("Deployed contract to ", address)

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
