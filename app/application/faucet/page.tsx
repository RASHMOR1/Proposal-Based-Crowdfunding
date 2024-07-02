"use client";

import React, { useState, useEffect } from "react";

import { GetBackButton, TransactionBox } from "@/components";
import { faucetMintInteraction } from "@/app/blockchainInteractions";

const Faucet = () => {
  const [transactionHash, setTransactionHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMintTransaction = async () => {
    setIsLoading(true);
    const data = await faucetMintInteraction();
    setIsLoading(false);
    setTransactionHash(data?.transactionHash);
  };

  return (
    <main>
      <GetBackButton />
      <div className="faucet-content flex w-lvw justify-center items-center flex-col">
        <div className="w-11/12 min-w-96 sm:w-4/5 md:w-3/5 max-w-7xl flex flex-col mt-10 justify-center items-center border border-4 rounded-2xl p-8 border-violet-600">
          <button
            onClick={handleMintTransaction}
            className="p-3 violet m-0 w-fit rounded-lg cursor-pointer text-white transition duration-150 ease-in-out transform active:scale-90"
          >
            {isLoading ? (
              <div className="flex items-center ">
                <div className="spinner mr-2"></div>
                Loading...
              </div>
            ) : (
              "Get Mock USDT Tokens"
            )}
          </button>
          {transactionHash && (
            <div className="mt-4 text-sm text-slate-800">
              <TransactionBox transactionHash={transactionHash} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Faucet;
