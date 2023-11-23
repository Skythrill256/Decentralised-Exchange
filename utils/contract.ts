import  ethers  from "ethers";
import CustomDexABI  from './CustomDex.json'
import CustomTokenABI  from './CustomToken.json'
const ABI1: any = CustomDexABI
const ABI2: any = CustomTokenABI
declare global {
    interface Window {
      ethereum: any;
    }
  }

export const tokenContract = async (address:any) => {
    const provider  = new ethers.providers.Web3Provider((window as any).ethereum)
    const {ethereum} = window
    if (ethereum) {
        const signer = provider.getSigner()
        const contractReader = new ethers.Contract (address,ABI2.abi,signer)
        return  contractReader
    }
    
}
export const contract = async () => {
    const provider  = new ethers.providers.Web3Provider((window as any).ethereum)
    const {ethereum} = window
    if (ethereum) {
        const signer = provider.getSigner()
    const contractReader = new ethers.Contract("0x138c09E7166EdDdE96c3EE854CdAE9cdE6CEee9c",ABI1.abi,signer)
    return contractReader
    }
}