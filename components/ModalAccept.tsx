"use client";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../app/globals.css";
import { dateToUnix } from "../app/serverActions";
import { companyMakeDecisionInteraction } from "../app/blockchainInteractions";
import TransactionBox from "./TransactionBox";

interface ModalAcceptProps {
  proposalId: number;
  proposalDecisionMade: boolean;
  setProposalDecisionMade: (value: boolean) => void;
}
const ModalAccept: React.FC<ModalAcceptProps> = ({
  proposalId,
  proposalDecisionMade,
  setProposalDecisionMade,
}) => {
  const [fundingGoal, setFundingGoal] = useState("");
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
  const [transactionHash, setTransactionHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getMinDate = (): Date => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 7);
    return minDate;
  };

  const handleSendTransaction = async () => {
    const unixDeadlineDate = dateToUnix(deadlineDate);
    const parsedFundingGoal = Number(fundingGoal);

    if (!fundingGoal || !deadlineDate) {
      alert("Please fill all the fields correctly");
      return;
    }
    if (isNaN(parsedFundingGoal)) {
      alert("Please ensure that the funding goal is a number");
      return;
    }
    if (Number(unixDeadlineDate) < Number(dateToUnix(getMinDate()))) {
      alert("Make deadline at least a week from current date");
      return;
    }

    setIsLoading(true);

    const data = await companyMakeDecisionInteraction(
      proposalId,
      1 as number, // Assuming 1 is the decision value you want to pass
      parsedFundingGoal,
      unixDeadlineDate as number
    );
    setIsLoading(false);
    setProposalDecisionMade(!proposalDecisionMade);
    setTransactionHash(data?.transactionHash);
    console.log("this is data from transaction accep:t", data);
    console.log("set this accept transaction hash:", data?.transactionHash);
  };

  useEffect(() => {
    console.log("this is new deadline date:", deadlineDate);
    console.log("this is date in unix timestamp:", dateToUnix(deadlineDate));
    console.log("this is funding goal:", fundingGoal);
    console.log("this is proposal id", proposalId);
    console.log("this is min date:", getMinDate());
  }, [deadlineDate]);
  return (
    <div className="w-11/12 p-4 flex flex-col border border-2 border-violet-500 rounded-2xl min-w-80 h-64">
      <div className="flex flex-col">
        <h2>Funding Goal:</h2>

        <div className="flex items-center">
          <input
            className="my-2 w-full rounded-2xl p-2 border border-2 border-violet-500 focus:outline-none"
            placeholder="Ex. 10000"
            onChange={(e) => setFundingGoal(e.target.value)}
          />
          <h2 className="mx-2">USDT</h2>
        </div>
      </div>
      <div>
        <h2>Deadline: (at least a week from today)</h2>
        <div className="flex my-1 md:mb-0">
          <DatePicker
            selected={deadlineDate}
            onChange={(date: Date) => setDeadlineDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select a date"
            className="border border-2 border-violet-500 focus:outline-none rounded-2xl p-2"
          />
        </div>
      </div>
      <div
        className={`flex flex-row ${transactionHash ? "justify-start" : "justify-start"} items-center mt-4`}
      >
        <button
          className={`whitespace-nowrap mr-4 p-3 m-0 rounded-lg text-white ${proposalDecisionMade ? "lightViolet" : "cursor-pointer violet transition duration-150 ease-in-out transform active:scale-90"}`}
          onClick={handleSendTransaction}
          disabled={proposalDecisionMade || isLoading}
        >
          {isLoading ? (
            <div className="flex items-center ">
              <div className="spinner mr-2"></div>
              Loading...
            </div>
          ) : proposalDecisionMade ? (
            "Done"
          ) : (
            "Send Transaction"
          )}
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

export default ModalAccept;
