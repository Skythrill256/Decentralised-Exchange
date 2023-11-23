import React ,{useState,useEffect} from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import toast ,{Toaster} from "react-hot-toast";

import {Menu ,Logo ,TokenBalence} from "./index"


const Header = () => {
  const [tokenBalenceComp, setTokenBalenceComp] = useState()
  const {address} = useAccount()
  const notifyConnectionWallet =() =>{
    toast.error("Connect wallet" , {duration: 2000})
  }
  useEffect(()=>{
    setTokenBalenceComp(
      <>
      <TokenBalence name = {"USD Coin"} walletAddress ={address} />
      <TokenBalence name = {"BNB"} walletAddress ={address} />
      <TokenBalence name = {"SHIBA INU"} walletAddress ={address} />
      
      </>
    )
    if (!address) notifyConnectionWallet()
  }, [address])

  return (
    <header className="p-4 text-gray-100 ">
          <div className="container flex justify-between h-16 mx-auto">
              <div className="flex">
                <a 
                rel="noopener noreferer"
                href="#"
                aria-label="Back to homepage"
                className="flex items-center p-2"
                >
                  <Logo />
                </a>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                  <li className="flex">
                    <a
                      rel ="noopener noreferrer"
                      href="/"
                      className="flex items-center px-4 -mb-1 dark:border-transparent text-[#7765F3] border-[#7765F3]"
                    >
                      Swap
                    </a>

                  </li>
                  <li className="flex">
                    <a
                      rel="noopener noreferrer"
                      href="/tokens"
                      className="flex items-center px-4 -mb-1 dark:border-transparent text-[#7765F3] border-[#7765F3]"
                      >
                        Tokens
                      </a>
                    </li>
                   <li className="flex">
                      <a rel = "noopener noreferrer"
                      href="#"
                      className="flex items-center px-4 -mb-1 dark:border-transparent text-[#7765F3] border-[#7765F3]"
                      >
                        NFT
                      </a>
                    </li> 
                    <li className="flex">
                      <a
                      rel = "noopener noreferrer"
                      href="#"
                      className="flex items-center px-4 -mb-1 dark:border-transparent text-[#7765F3] border-[#7765F3]"
                      >
                        Pool
                      </a>
                    </li>
                </ul>
              </div>
              <div className="items-center flex-shrink-0 hidden lg:flex">
                <TokenBalence name ={"USD Coin"} walletAddress ={address} />
                <TokenBalence name ={"SHIBA INU"} walletAddress ={address} />
                <TokenBalence name ={"BNB"} walletAddress ={address} />
                <ConnectButton />
              </div>
              <button className="p-4 lg:hidden">
                <Menu />
              </button>
          </div>
          <Toaster />
    </header>
  )
  
};

export default Header;
