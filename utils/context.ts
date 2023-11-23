import { BigNumber , ethers } from "ethers";
import {contract, tokenContract} from './contract'
import {toEth } from './utils'

export const swapEthToToken = async (tokenName: string, amount : number) => {
    try{
        let tx = {value: toWei(amount)}
        const contractObj: any= await contract()
        const data = await contractObj.swapEthToToken(tokenName,tx)
        const reciept = await data.wait()
        return reciept

    } catch (error){
        console.error("Error ocurred")
    }
}
export const hasValidAllowance = async (owner: any , tokenName: string, amount : number) =>{
    try {
        const contractObj: any = await contract()
        const address = await contractObj.getTokenAddress(tokenName)
        const tokenContractObj: any = await tokenContract(address)
        const data = await tokenContractObj.allowance(
            owner,
            "0xdFBD5Df22D049D743c557D7CFf1Ff28a63CB7039"
            
            )
            const result = BigNumber.from(data.toString()).gte(BigNumber.from(toWei(amount)))
            return result
        }
        catch (e){
            console.error(e)
            return false
        }
}
export const swapTokenToEth = async (tokenName, amount) => {
    try {
        const contractObj: any = await contract()
        const data = await contractObj.swapTokenToEth(tokenName, toWei(amount))
        const reciept = await data.wait()
        return reciept
    } catch (error) {
        console.error(error)
        return false
    }
}

export const swapTokenToToken = async (srcToken , destToken , amount) => {
    try {
        const contractObj: any = await contract()
        const data = await contractObj.swapTokenToToken(srcToken , destToken , toWei(amount)) 
        const reciept = await data.wait()
        return reciept
    }
    catch (error){
        console.error(error)
        return false
    }
}
export const getTokenBalence = async (tokenName , address) =>{
    const contractObj: any = await contract()
    const balance = await contractObj.getBalence(tokenName, address)
    return balance
}

export const getTokenAddress = async (tokenName) =>{
    try {
        const contractObj: any = await contract()
        const address = await contractObj.getTokenAddress(tokenName)
        return address
    } catch (error) {
        console.error(error)
        return false
        
    }
}
export const increaseAllowance = async (tokenName , amount) => {
    try {
        const contractObj: any = await contract()
        const address = await contractObj.getTokenAddress(tokenName)
        const tokenContractObj: any = await tokenContract(address)
        const data = await tokenContractObj.approve("0xdFBD5Df22D049D743c557D7CFf1Ff28a63CB7039" , toWei(amount))
        const reciept = await data.wait()
        return reciept
    } catch (error) {
        console.error(error)
        return  false
    }
}
export const getAllHistory = async () => {
    try{
        const contractObj: any = await contract()
        const getAllHistory = await contractObj.getAllHistory()
        const historyTransactions = getAllHistory.map((history,i) => ({
            historyId: history.historyId.toNumber(),
            tokenA: history.tokenA,
            tokenB: history.tokenB,
            inputValue: toEth(history?.inputValue),
            outputValue: toEth(history?.outputValue),
            userAddress: history.userAddress,
        }))
        return historyTransactions
    }
    catch (error) {
        console.error(error)
        return false 
    }
}
const toWei = (amount) => {
    const toWei = ethers.utils.parseUnits(amount.toString())
    return toWei.toString()
}
const parseErrorMsg = (e) => {
    const json = JSON.parse(JSON.stringify(e))
    return json?.reason || json?.error?.message
}