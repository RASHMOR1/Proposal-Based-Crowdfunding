import connectDB from "./app/mongodb/connectToDB";
import ProposalModel from "./app/mongodb/proposalSchema"; // Adjust the path to your actual model
import { updateProposal } from "./app/serverActions";

interface UpdateProposalData {
  proposalId: number;
  newDecisionStatus?: number; // Optional field
  newFundingGoal?: number; // Optional field
  newDeadline?: number; // Optional field
}

const testData: UpdateProposalData = {
  proposalId: 41,
  newDecisionStatus: 1, // Optional field
  newFundingGoal: 100000,
  newDeadline: 100000000000,
};

async function testFunction() {
  try {
    await connectDB();
    const response = await updateProposal(testData);
    console.log("This is the response:", response);
  } catch (error) {
    console.error("Error during testing:", error);
  }
}

testFunction();
