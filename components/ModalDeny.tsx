"use client";
import React, { useEffect, useState } from "react";
import { companyMakeDecisionInteraction } from "@/app/blockchainInteractions";
import TransactionBox from "@/components/TransactionBox";

interface ModalDenyProps {
  proposalId: number;
  proposalDecisionMade: boolean;
  setProposalDecisionMade: (value: boolean) => void;
}

const ModalDeny: React.FC<ModalDenyProps> = ({
  proposalId,
  proposalDecisionMade,
  setProposalDecisionMade,
}) => {
  const [transactionHash, setTransactionHash] = useState("");
  const [comment, setComment] = useState("");

  const handleSendTransaction = async () => {
    console.log("this is proposal id :", proposalId);
    const data = await companyMakeDecisionInteraction(
      proposalId,
      2 as number,
      Number(0),
      Number(0)
    );
    setTransactionHash(data?.transactionHash);
    console.log("this is comment", comment);
    try {
      const updateFields = {
        proposalId: proposalId,
        newComment: comment,
      };

      const res = await fetch("/api/addAComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateFields),
      });

      const resData = await res.json();

      console.log("proposal updated, here is the result:", resData);
    } catch (e) {
      console.log("this is error:", e);
    }
    setProposalDecisionMade(!proposalDecisionMade);
  };

  return (
    <div className="w-11/12 p-4 flex flex-col border border-2 border-violet-500 rounded-2xl min-w-80 h-64">
      <div>
        <h2>Leave a comment: (optional)</h2>
        <textarea
          className="w-full p-4 rounded-2xl mt-2 border border-2 border-violet-500 focus:outline-none h-32"
          placeholder="Not possible because..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div
        className={`flex flex-row ${transactionHash ? "justify-start" : "justify-start"} items-center mt-2`}
      >
        <button
          className={`whitespace-nowrap mr-4 p-3  m-0 rounded-lg  text-white ${proposalDecisionMade ? "lightViolet" : "cursor-pointer violet transition duration-150 ease-in-out transform active:scale-90"} `}
          onClick={handleSendTransaction}
          disabled={proposalDecisionMade}
        >
          Send Transaction
        </button>
        {transactionHash && (
          <div className=" text-sm text-slate-800">
            <TransactionBox transactionHash={transactionHash} />
          </div>
        )}
      </div>
      {transactionHash && (
        <span className="text-sm mt-5 text-slate-800">
          Data will be updated when block is finalized (approx. 5 mins)
        </span>
      )}
    </div>
  );
};

export default ModalDeny;
