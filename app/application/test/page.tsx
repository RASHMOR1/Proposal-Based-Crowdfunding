"use client";

import { useState, useEffect } from "react";

import "../../globals.css";

import MainContractAbi from "../../../abiFile.json";

import { TransactionBox, GetBackButton } from "@/components";

import {
  getAccount,
  readContract,
  waitForTransaction,
  prepareWriteContract,
  writeContract,
} from "@wagmi/core";
import { mainContractAddress, mockUsdtAddress } from "@/constants/constants";

import MockUsdtAbi from "../../../MockUsdtAbi.json";

function CreatePage() {
  const [isCreateButtonClicked, setCreateButtonClicked] = useState(true);
  const [uploadingIpfs, setUploadingIpfs] = useState(false);
  const [uploadingTransaction, setUploadingTransaction] = useState(false);
  const [disabledCreateProposal, setDisabledCreateProposal] = useState(false);
  const [disabledSendTransaction, setDisabledSendTransaction] = useState(true);
  const [transactionHash, setTransactionHash] = useState("");
  const [form, setForm] = useState({ address: "", title: "", proposal: "" });
  const [isAllowanceEnough, setIsAllowanceEnough] = useState(false);
  const [ipfsHash, setIpfsHash] = useState("");

  const account = getAccount();
  const userAddress = account?.address;

  useEffect(() => {
    if (userAddress) {
      getAllowanceAmount();
    }
  }, [userAddress]);

  const getAllowanceAmount = async () => {
    try {
      const data = await readContract({
        address: mockUsdtAddress,
        abi: MockUsdtAbi,
        functionName: "allowance",
        args: [userAddress, mainContractAddress],
      });
      const dataNumber = Number(data) / 10 ** 18;
      if (dataNumber >= 10000) {
        setIsAllowanceEnough(true);
      }
    } catch (error) {
      console.error("Error fetching allowance:", error);
    }
  };

  const approveMockUsdt = async () => {
    setUploadingTransaction(true);
    try {
      const { request: prepareConfig } = await prepareWriteContract({
        address: mockUsdtAddress,
        abi: MockUsdtAbi,
        functionName: "approve",
        args: [mainContractAddress, 10 ** 18],
      });
      const { hash: approveHash } = await writeContract(prepareConfig);
      await waitForTransaction({ hash: approveHash });
      setIsAllowanceEnough(true);
    } catch (error) {
      console.error("Error approving USDT:", error);
    }
    setUploadingTransaction(false);
  };

  const createProposalMainContract = async () => {
    setUploadingTransaction(true);
    try {
      const { request: prepareConfig } = await prepareWriteContract({
        address: mainContractAddress,
        abi: MainContractAbi,
        args: [form.address, ipfsHash],
        functionName: "createProposal",
      });
      const { hash } = await writeContract(prepareConfig);
      const data = await waitForTransaction({ hash });
      setTransactionHash(data.transactionHash);
      setDisabledSendTransaction(true);
    } catch (error) {
      console.error("Error creating proposal:", error);
    }
    setUploadingTransaction(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !/^0x[a-fA-F0-9]{40}$/.test(form.address) ||
      !form.title ||
      !form.proposal
    ) {
      alert("Please ensure all fields are correctly filled.");
      return;
    }

    setUploadingIpfs(true);
    try {
      const res = await fetch("/api/pinToIPFS", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const resData = await res.json();
      setIpfsHash(resData.IpfsHash);
      setCreateButtonClicked(false);
      setDisabledCreateProposal(true);
      setDisabledSendTransaction(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Trouble uploading file");
    }
    setUploadingIpfs(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <main className="flex w-lvw items-center flex-col">
      <GetBackButton />
      <form
        className="w-11/12 min-w-96 sm:w-4/5 md:w-3/5 max-w-7xl flex flex-col mt-10 border border-4 rounded-2xl p-8 border-violet-600"
        onSubmit={handleSubmit}
      >
        <div className="my-3">
          <h3>Company Address:</h3>
          <input
            className="my-2 w-full rounded-2xl p-2 border border-2 border-violet-500 focus:outline-none "
            placeholder="Address of the company"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
        <div className="my-3">
          <h3>Title of the proposal:</h3>
          <input
            className="my-2 w-full rounded-2xl p-2 border border-2 border-violet-500 focus:outline-none "
            placeholder="Title of the proposal"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div className="w-full my-3">
          <h3 className="my-2">The proposal:</h3>
          <textarea
            className="h-48 w-full rounded-2xl p-4 border border-2 border-violet-500 focus:outline-none"
            placeholder="Input the proposal text"
            value={form.proposal}
            onChange={(e) => setForm({ ...form, proposal: e.target.value })}
          ></textarea>
        </div>
        {/* this is the add to ipfs button */}
        <div className="flex justify-evenly">
          <div className="flex">
            <h1 className="self-center mx-2">1</h1>
            <button
              className={`p-3 violet w-fit rounded-lg cursor-pointer text-white ${disabledCreateProposal ? "opacity-30" : ""}`}
              type="submit"
              disabled={disabledCreateProposal}
              // onClick={handleSubmit}
            >
              {!uploadingIpfs ? "Upload proposal to ipfs" : "Uploading..."}
              {/* Upload proposal to Ipfs */}
            </button>
          </div>

          {/* this is approve button */}
          <div className="flex justify-between content-center">
            <h1 className="self-center mx-2">2</h1>
            {!isAllowanceEnough ? (
              <button
                className={`p-3 violet w-fit rounded-lg cursor-pointer text-white ${!disabledCreateProposal || disabledSendTransaction ? "opacity-30" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  approveMockUsdt();
                }}
                disabled={disabledSendTransaction}
              >
                {transactionHash
                  ? "Done"
                  : uploadingTransaction
                    ? "Loading..."
                    : "Approve"}
                {/* {uploadingTransaction ? "Loading..." : "Approve"} */}
              </button>
            ) : (
              <div>
                <button
                  className={`p-3 violet w-fit rounded-lg cursor-pointer text-white ${!disabledCreateProposal || disabledSendTransaction || transactionHash ? "opacity-30" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    createProposalMainContract();
                  }}
                  disabled={disabledSendTransaction}
                >
                  {uploadingTransaction
                    ? "Loading..."
                    : transactionHash
                      ? "Done"
                      : "Send the transaction"}
                </button>
                {/* <h3>
                  {transactionHash &&
                    `this is transaction hash:${transactionHash}`}
                </h3> */}
              </div>
            )}
          </div>
        </div>
        <h3 className="text-sm text-slate-800 self-center mt-4">
          {transactionHash && (
            <TransactionBox transactionHash={transactionHash} />
          )}
        </h3>
      </form>
      {transactionHash && (
        <button
          onClick={refreshPage}
          className="my-4 p-3 violet w-fit rounded-lg cursor-pointer text-white "
        >
          Create a new Proposal
        </button>
      )}
    </main>
  );
}

export default CreatePage;