import moment from "moment";
import connectDB from "./mongodb/connectToDB";
import ProposalModel from "./mongodb/proposalSchema";

import { FullProposalData } from "../interfaces/Interfaces";

export async function readIpfs(ipfs: string) {
  const ipfsLink = `https://ipfs.io/ipfs/${ipfs}`;
  const response = await fetch(ipfsLink);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const proposalData = await response.json();
  return proposalData;
}

export const getData = async (id: number): Promise<FullProposalData> => {
  try {
    await connectDB();

    if (!id) {
      throw new Error(`Id parameter is required`);
    }

    const query = { proposalId: Number(id) };
    const returnData = await ProposalModel.findOne(query);

    if (!returnData) {
      throw new Error(`Proposal not found`);
    }

    const plainReturnData = returnData.toObject();

    // Convert complex properties to plain values
    const responseData: FullProposalData = {
      ...plainReturnData,
      _id: plainReturnData._id.toString(), // Convert ObjectId to string

      ipfsData: {} as any, // placeholder, will be overwritten
    };

    const ipfsLink = `https://ipfs.io/ipfs/${plainReturnData.proposalURI}`;
    const ipfsResponse = await fetch(ipfsLink);
    if (!ipfsResponse.ok) {
      throw new Error(`HTTP error! status: ${ipfsResponse.status}`);
    }

    responseData.ipfsData = await ipfsResponse.json();

    console.log("this is returnData from get request Api:", responseData);
    return responseData;
  } catch (error) {
    console.error(error);
    throw new Error(`Internal server error`);
  }
};

export const parseData = (timestamp: number) => {
  let parsed = moment.unix(timestamp).utc();
  return parsed.format("YYYY-MM-DD HH:mm [UTC]Z"); // Custom format in UTC
};

export const dateToUnix = (date: Date | null): number | undefined => {
  if (date === null) {
    return;
  }
  return Math.floor(date.getTime() / 1000);
};

export const modifyHash = (hash: string) => {
  return hash.slice(0, 5) + "..." + hash.slice(-5);
};

interface UpdateProposalData {
  proposalId: number;
  newDecisionStatus?: number;
  newFundingGoal?: number;
  newDeadline?: number;
  newComment?: string;
  newCurrentFunding?: string;
  additionalFunding?: number;
}

export async function updateProposal(data: UpdateProposalData) {
  try {
    const updateFields: any = {};
    if (data.newFundingGoal !== undefined)
      updateFields.fundingGoal = data.newFundingGoal;
    if (data.newDeadline !== undefined)
      updateFields.deadline = data.newDeadline;
    if (data.newDecisionStatus !== undefined)
      updateFields.decisionStatus = data.newDecisionStatus;
    if (data.newComment !== undefined) updateFields.comment = data.newComment;

    if (data.additionalFunding !== undefined) {
      // Fetch the current proposal from the database
      const currentProposal = await ProposalModel.findOne({
        proposalId: data.proposalId,
      });
      if (!currentProposal) {
        console.log("Proposal not found.");
        return null;
      }

      // Calculate new current funding
      const currentFunding = Number(currentProposal.currentFunding || 0);
      const newCurrentFunding = currentFunding + data.additionalFunding;
      updateFields.currentFunding = newCurrentFunding;
    } else if (data.newCurrentFunding !== undefined) {
      updateFields.currentFunding = data.newCurrentFunding;
    }

    const result = await ProposalModel.findOneAndUpdate(
      { proposalId: data.proposalId },
      { $set: updateFields },
      { new: true }
    );

    if (result) {
      console.log("Proposal updated successfully:", result);
      return result;
    } else {
      console.log("Proposal not found.");
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating proposal:", error);
      throw new Error(`Error updating proposal: ${error.message}`);
    } else {
      console.error("Unknown error updating proposal:", error);
      throw new Error("Unknown error updating proposal");
    }
  }
}

export async function fetchProposals(str: string) {
  await connectDB();
  let searchTerm = `${str}`;

  const convertToLowerCase = (text: string) => {
    const convertedText = text.replace(/[A-Z]/g, (match) =>
      match.toLowerCase()
    );
    return convertedText;
  };
  const searchTermLower = convertToLowerCase(searchTerm);

  const convertFirstLetterToCapital = (text: string) => {
    const convertedText = text.replace(/(^\w{1})|(\.\s*\w{1})/g, (match) =>
      match.toUpperCase()
    );
    return convertedText;
  };
  const searchTermFirst = convertFirstLetterToCapital(searchTerm);

  // Check if the search term can be converted to a number
  const searchTermNumber = !isNaN(Number(searchTerm))
    ? Number(searchTerm)
    : null;

  // Build the query
  let query: any = {
    $or: [
      {
        toCompanyAddress: { $regex: searchTermLower, $options: "i" },
      },
      {
        toCompanyAddress: { $regex: searchTerm, $options: "i" },
      },
      {
        toCompanyAddress: { $regex: searchTermFirst, $options: "i" },
      },
      {
        fromAddress: { $regex: searchTermLower, $options: "i" },
      },
      {
        fromAddress: { $regex: searchTerm, $options: "i" },
      },
      {
        fromAddress: { $regex: searchTermFirst, $options: "i" },
      },
    ],
  };

  // If searchTerm can be a number, add a condition for proposalId
  if (searchTermNumber !== null) {
    query.$or.push({
      proposalId: searchTermNumber,
    });
  }

  try {
    let quotes = await ProposalModel.find(query);
    return quotes;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw new Error("Failed to fetch quotes");
  }
}
