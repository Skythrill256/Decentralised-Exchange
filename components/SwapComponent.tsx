import React,{useState,useEffect,useRef} from "react";
import{
  hasValidAllowance,
  increaseAllowance,
  swapEthToToken,
  swapTokenToToken,
} from '../utils/context'
import {CogIcon , ArrowSmDownIcon } from "@heroicons/react/outline"
import SwapField from "./SwapField";
import  TransactionStatus  from "./TransactionStatus";
import toast , {Toaster} from "react-hot-toast"
import { DEFAULT_VALUE , ETH } from "../utils/saleToken"
import {toEth ,toWei} from "../utils/utils"
import { useAccount } from "wagmi";
import { populate } from "dotenv";

const SwapComponent = () => {
  const [srcToken , setSrcToken] = useState(ETH)
  const [destToken , setDestToken] = useState(DEFAULT_VALUE)
  const [inputValue , setInputValue] = useState()
  const [outputValue , setOutputValue] = useState()
  const inputValueRef = useRef()
  const outputValueRef = useRef()

  const isReversed = useRef(false)
  const INCREASE_ALLOWANCE = "IncreaseAllowance"
  const ENTER_AMOUNT ="Enter Amount"
  const CONNECT_WALLET ="Connect Wallet"
  const SWAP ="swap"

  const srcTokenObj = {
    id: "srcToken",
    value: inputValue,
    setValue: setInputValue,
    defaultValue: srcToken,
    ignoreValue: destToken,
    setToken: setSrcToken,
  }
  const destTokenObj ={
    id: "srcToken",
    value: outputValue,
    setValue: setOutputValue,
    defaultValue: destToken,
    ignoreValue: srcToken,
    setToken: setDestToken,
  }
const [srcTokenComp, setSrcTokenComp]= useState()
const [destTokenComp, setDestTokenComp]= useState()

const [swapBtnText ,setSwapBtnText] = useState(ENTER_AMOUNT)
const [txPending ,setTxPending] = useState(false)

const notifyError = (msg:any) => toast.error(msg, {duration: 6000})
const notifySuccess = () => toast.success("Transaction completed successfully")

const {address} = useAccount()
useEffect(()=>{
  if(!address) setSwapBtnText(CONNECT_WALLET)
  else if (!inputValue || !outputValue) setSwapBtnText(ENTER_AMOUNT)
  else setSwapBtnText(SWAP)
},[inputValue,outputValue,address])

useEffect(()=>{
  if(
    document.activeElement !== outputValueRef.current &&
    document.activeElement.ariaLabel !== "srcToken" &&
    !isReversed.current
  )
  populateOutputValue(inputValue)

  setSrcToken(<SwapField obj ={srcTokenObj} ref ={inputValueRef} />)
  if (inputValue?.length === 0) setOutputValue("")
},[inputValue,destToken])

useEffect(()=>{
  if(
    document.activeElement !== inputValueRef.current &&
    document.activeElement.ariaLabel !== "destToken" &&
    !isReversed.current
  )
  populateOutputValue(outputValue)
  setDestTokenComp(<SwapField obj ={destTokenObj}, ref = {outputValueRef} />)
    if(outputValue?.length === 0) setInputValue ("")
    if (isReversed.current) isReversed.current =false
},[outputValue,srcToken])

const handleSwap = async() =>{
  if(srcToken === ETH && destToken !== ETH){
  performSwap()
  }
  else {
    setTxPending(true)
    const result = await hasValidAllowance (address ,srcToken ,inputValue)
    setTxPending(false)

    if(result) performSwap()
    else handleInsufficientAllowance ()
  }
}
const handleIncreaseAllowance = async () =>{
  setTxPending(true)
  await increaseAllowance(srcToken,inputValue)
  setTxPending(false)

  setSwapBtnText(SWAP)
}
const handleReverseExchange = (e) {
  isReversed.current = true
  setInputValue (outputValue)
  setOutputValue(inputValue)

  setSrcToken (destToken)
  setDestToken(srcToken)
}
const getSwapBtnClassNAme = () => {
let className ="p-4 w-full my-2 rounded-xl"
className += 
  swapBtnText === ENTER_AMOUNT || swapBtnText === CONNECT_WALLET 
  ? "text-zinc-400 bg-zinc-800 pointer-events-none"
  : "bg-blue-700"
  className += swapBtnText === INCREASE_ALLOWANCE? "ng-yellow-600" : ""
  return className
}
const populateOutputValue =() =>{
  if (destToken)
}
  return (
  <div className="border-[1px] rounded-l border-[#7765F3] bg-[#7765f3] w-100% p-4 px-6 rounded-xl ">
    <div className="flex items-center justify-between py-4 px-1">
      <p>Swap</p>
      <CogIcon className="h-6" />

    </div>
    <div className="relative bg-[#212429] p-5 py-6 mb-2 border-[2px] border-transparenthover:border-zinc-600">
      {srcTokenComp}
      <ArrowSmDownIcon  className="absolute left-1/2 -translate-x-1/2 -bottom-6 h-10 p-1 bg-[#212423] border-4 border-zinc-900 text-zinc-300 rounded-xl cursor-pointer hover:scale-110"
      onClick={handleReverseExchange}
      />
      
    </div>
    <div className="bg-[#212429] p-4 py-6 rounded-xl mt-2 border-[2px] border-transparent hover:border-zinc-600">
      {destTokenComp}
      </div>
      <button className={getSwapBtnClassName}
      onClick={()=>{
        if(swapBtnText === INCREASE_ALLOWANCE) handleIncreaseAllowance()
        else if(swapBtnText === SWAP) handleSwap()

      }}
      >{swapBtnText}</button>
      {txPending && <TransactionStatus />}
      <Toaster />
  </div>
  );
};

export default SwapComponent;
