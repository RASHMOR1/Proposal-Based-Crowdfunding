"use client";
import React from "react";
import { modifyHash } from "../app/serverActions";

interface TransactionBoxProps {
  transactionHash: string;
}

const TransactionBox: React.FC<TransactionBoxProps> = ({ transactionHash }) => {
  return (
    <div className="w-fit">
      transaction hash:{" "}
      <a
        target="_blank"
        className="underline text-cyan-700"
        href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
      >
        {modifyHash(transactionHash)}
      </a>
    </div>
  );
};

export default TransactionBox;
