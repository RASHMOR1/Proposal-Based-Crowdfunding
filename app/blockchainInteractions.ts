import MainContractAbi from "./../abiFile.json";
import GetBackButton from "@/components/GetBackButton";

import {
  getAccount,
  readContract,
  waitForTransaction,
  prepareWriteContract,
  writeContract,
} from "@wagmi/core";
import {
  mainContractAddress,
  mockUsdtAddress,
  mockusdtDecimals,
} from "@/constants/constants";

import MockUsdtAbi from "./../MockUsdtAbi.json";

export const approveMockUsdtInteraction = async (amount: number) => {
  const { request: prepareConfig } = await prepareWriteContract({
    address: mockUsdtAddress, // mock usdt contract
    abi: MockUsdtAbi,
    functionName: "approve",
    args: [mainContractAddress, amount * 10 ** mockusdtDecimals],
  });
  const { hash: approveHash } = await writeContract(prepareConfig);
  const data = await waitForTransaction({
    hash: approveHash,
  });

  console.log("this is the data from wait for the transaction", data);
};

export const createProposalInteraction = async (
  ipfsHash: string,
  formAddress: string
) => {
  const { request: prepareConfig } = await prepareWriteContract({
    address: mainContractAddress,
    abi: MainContractAbi,
    args: [formAddress, ipfsHash],
    functionName: "createProposal",
  });
  const { hash } = await writeContract(prepareConfig);

  const data = await waitForTransaction({
    hash,
  });
  return data;
};

export const getAllowanceInteraction = async (userAddress: `0x${string}`) => {
  const data = await readContract({
    address: mockUsdtAddress, // mock usdt contract
    abi: MockUsdtAbi,
    functionName: "allowance",
    args: [userAddress, mainContractAddress],
  });
  console.log("this is fetched data:", data);
  const dataNumber = Number(data) / (10 * 10 ** 14);
  console.log("this is the allowance amount:", dataNumber);
  return dataNumber;
};

export const fundProposalInteraction = async (
  proposalId: number,
  fundingAmount: number
) => {
  const { request: fundProposal } = await prepareWriteContract({
    address: mainContractAddress,
    abi: MainContractAbi,
    args: [proposalId, fundingAmount * 10 ** mockusdtDecimals],
    functionName: "fundProposal",
  });
  const { hash } = await writeContract(fundProposal);

  const data = await waitForTransaction({
    hash,
  });
  return data;
};

export const companyMakeDecisionInteraction = async (
  proposalId: number,
  decision: number,
  fundingGoal: number,
  deadline: number
) => {
  const { request: makeDecisionConfig } = await prepareWriteContract({
    address: mainContractAddress,
    abi: MainContractAbi,
    args: [proposalId, decision, fundingGoal, deadline],
    functionName: "companyMakeDecision",
  });
  const { hash } = await writeContract(makeDecisionConfig);

  const data = await waitForTransaction({
    hash,
  });
  return data;
};
