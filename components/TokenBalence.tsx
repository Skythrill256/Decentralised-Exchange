import React ,{useEffect,useState,useRef} from "react";
import { ethers } from "ethers";
import toast ,{Toaster} from "react-hot-toast"
import {
 ClipboardIcon,
 ClipboardCheckIcon,
 PlusIcon,
} from "@heroicons/react/outline"

import {TransactionStatus} from"./index"
import {
  getTokenAddress,
  getTokenBalence,
  increaseAllowance,
} from "../utils/context"


const TokenBalence = ({name ,walletAddress}) => {
  const [balence , setBalence]= useState("-")
  const [tokenAddress, setTokenAddress]= useState()
  const [copyIcon , setCopyIcon] = useState({icon: ClipboardIcon})
  const [txPending, setTransactionPending] = useState(false)

  const notifyError = (msg:any) => toast.error(msg ,  {duration: 6000})
  const notifySuccess = (msg:any) => toast.success("Transaction completed")

  useEffect(()=>{
    if(name && walletAddress){
      fetchTokenBalence()
      fetchTokenAddress()

    }else setBalence("-")

  }, [name, walletAddress])
 const fetchTokenBalence = async () =>{
  const balence2 = await getTokenBalence(name, walletAddress)
  console.log(balence2)
  const fetchBalence = ethers.utils.formatUnits(balence.toString(),18)
  setBalence(fetchBalence.toString())
 }
 const fetchTokenAddress = async ()=>{
  const Address = await getTokenAddress(name)
  setTokenAddress(Address)
}
  return (<div className="flex mx-2 border-[1px] rounded-r-lg border-[#7765F3">
    <div className="flex items-center bg-zinc-900 text-zinc-300 w-fit p-2 px-3 rounded-l-lg">
      <p className="text-sm">{name}</p>
      <p className="bg-zinc-800 p-0.5 px-3 ml-3 rounded-lg text-zinc-100">
        {balence}
      </p>
    </div>
    <div className="flex items-center p-2 px-2 bg-[#7765F3] rounded-r-lg">
      <copyIcon.icon
        className="h-6 cursor-pointer"
        onClick={()=>{
          navigator.clipboard.writeText(tokenAddress)
          setCopyIcon({icon: ClipboardCheckIcon})
        }}
        />
    </div>
    {txPending && <TransactionStatus />}
    <Toaster />
  </div>
  )
};

export default TokenBalence;
