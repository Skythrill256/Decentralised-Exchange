import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const NEXT_PUBLIC_POLYGON_MUMBAI_RPC = "https://rpc.ankr.com/polygon_mumbai";
const NEXT_PUBLIC_PRIVATE_KEY: any = "bc523b4e2aefc2ab020e64b85693a135152729c0571fef5546e56b55ff44cb71";
const POLYGONSCAN_API_KEY: any = "SQQE1HZDPQPTEGITAGJ1SJ8H1DY45PIBXN"
const config: HardhatUserConfig = {
  solidity: "0.8.0",
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
      chainId: 80001,
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  }
};


export default config;
// 0x138c09E7166EdDdE96c3EE854CdAE9cdE6CEee9c