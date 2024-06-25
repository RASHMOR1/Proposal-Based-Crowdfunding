import React from "react";
import { ProposalDataFromMongo } from "@/interfaces/Interfaces";

import "../app/globals.css";
import { readIpfs, parseData } from "../app/serverActions";
import Link from "next/link";
import { decisionText } from "../constants/constants";

const Proposal: React.FC<{ data: ProposalDataFromMongo }> = async ({
  data,
}) => {
  const proposalData = await readIpfs(data.proposalURI);

  function modifyHash(hash: string) {
    return hash.slice(0, 5) + "..." + hash.slice(-5);
  }
  function modifyTitle(title: string) {
    if (title.length < 30) {
      return title;
    }
    return title.slice(0, 30) + "...";
  }

  return (
    <div className="w-full h-full bg-white p-4 shadow-md rounded-md">
      <div className="flex justify-around ">
        <div>
          <h2>
            <span className="underline">From</span>:{" "}
            {modifyHash(data.fromAddress)}
          </h2>
        </div>
        <div>
          <h2>
            <span className="underline">To</span>:{" "}
            {modifyHash(data.toCompanyAddress)}
          </h2>
        </div>
      </div>
      <h1>
        <span className="underline">Proposal number</span>: {data.proposalId}
      </h1>

      <h2>
        <span className="underline">Status</span>:{" "}
        <span
          className={
            "p-1 rounded " +
            (data.decisionStatus == 0
              ? "bg-yellow-300 text-slate-600"
              : data.decisionStatus == 1
                ? "bg-blue-500 text-white"
                : data.decisionStatus == 2
                  ? "bg-red-600 text-white"
                  : data.decisionStatus == 3
                    ? "bg-green-500 text-white"
                    : data.decisionStatus == 4
                      ? "bg-red-600 text-white"
                      : "")
          }
        >
          {decisionText[data.decisionStatus]}
        </span>
      </h2>

      <h2>
        <span className="underline">Proposal title</span>:{" "}
        {modifyTitle(proposalData.title)}{" "}
      </h2>
      <h2>
        {Number(data.fundingGoal) > 0 && (
          <>
            <span className="underline">Funding goal:</span> {data.fundingGoal}{" "}
            USDT
          </>
        )}
      </h2>

      <h2>
        {
          Number(data.currentFunding) > 0 && (
            <>
              <span className="underline">Current Funding:</span>{" "}
              {data.currentFunding} USDT
            </>
          )
          //`Current funding: ${data.currentFunding}`
        }
      </h2>
      <h2>
        {
          Number(data.deadline) > 0 && (
            <>
              <span className="underline">Deadline:</span>{" "}
              {parseData(Number(data?.deadline))}
            </>
          )

          //`Deadline: ${parseData(Number(data?.deadline))}`
        }
      </h2>
      <div className="flex justify-around m-2">
        <Link href={`/application/proposals/${data.proposalId}`}>
          <button className="p-2 violet w-fit rounded-lg cursor-pointer text-white transition duration-150 ease-in-out transform active:scale-90">
            See the proposal
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Proposal;
