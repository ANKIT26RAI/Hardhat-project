// Importing ethers from hardhat to access utils like parseEther
const { ethers } = require("hardhat");

async function main() {
    // Get the deployer's account
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Set the unlock time (1 hour from now)
    const unlockTime = Math.floor(Date.now() / 1000) + 3600; // 3600 seconds = 1 hour
    console.log("Unlock time:", unlockTime);

    // Get the contract factory for the Lock contract
    const Lock = await ethers.getContractFactory("Lock");

    // Deploy the contract with the unlock time and send 0.1 ETH (100000000000000000 wei)
    const lock = await Lock.deploy(unlockTime, {
        value: "100000000000000000", // 0.1 ETH in Wei
    });

    // Wait for the contract to be mined
    await lock.waitForDeployment();

    // Output the contract address after deployment
    console.log("Lock contract deployed to:", lock.address);
}

// Execute the deployment function
main()
    .then(() => process.exit(0)) // Exit after successful deployment
    .catch((error) => {
        console.error(error);  // Log any errors that occur
        process.exit(1); // Exit with error code 1
    });
