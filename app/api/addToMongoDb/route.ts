import connectDB from "../../mongodb/connectToDB";
import ProposalModel from "../../mongodb/proposalSchema";
import MainContractAbi from "../../../abiFile.json";
import { decodeEventLog } from "viem";
import {
  FullProposalData,
  ProposalData,
  TopicInterface,
} from "@/interfaces/Interfaces";
import { updateProposal } from "@/app/serverActions";

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    //const data = req.body;
    console.log("this is data:", data);

    if (data.confirmed) {
      // change to confirmed
      let newProposals: TopicInterface[] = [];
      for (let i = 0; i < data.logs.length; i++) {
        let topic = decodeEventLog({
          abi: MainContractAbi,
          data: data.logs[i].data,
          topics: [
            data.logs[i].topic0,
            data.logs[i].topic1,
            data.logs[i].topic2,
            data.logs[i].topic3,
          ],
          strict: false,
        }) as TopicInterface;
        console.log("this is topic:", topic);
        newProposals.push(topic);
      }

      console.log("these are new proposals", newProposals);

      await connectDB();
      let arrayToMongoDb: ProposalData[] = [];

      for (let proposal of newProposals) {
        if (proposal.eventName == "MainContract__ProposalCreated") {
          arrayToMongoDb.push({
            proposalId: Number(proposal.args.proposalId),
            toCompanyAddress: proposal.args.toCompanyAddress,
            fromAddress: proposal.args.fromAddress,
            proposalURI: proposal.args.proposalURI,
            decisionStatus: proposal.args.decisionStatus,
            fundingGoal: Number(proposal.args.fundingGoal),
            currentFunding: Number(proposal.args.currentFunding),
            deadline: Number(proposal.args.deadline),
            comment: "",
          });
        } else if (
          proposal.eventName == "MainContract__ProposalStatusChanged"
        ) {
          await updateProposal({
            proposalId: Number(proposal.args.proposalId),
            newDecisionStatus: Number(proposal.args.decisionStatus),
          });
        } else if (
          proposal.eventName ==
          "MainContract__ProposalFundingGoalAndDeadlineUpdated"
        ) {
          await updateProposal({
            proposalId: Number(proposal.args.proposalId),
            newFundingGoal: Number(proposal.args.fundingGoal),
            newDeadline: Number(proposal.args.deadline),
          });
        } else if (
          proposal.eventName == "MainContract__CompanyExecutingProposal"
        ) {
          await updateProposal({
            proposalId: Number(proposal.args.proposalId),
            newCurrentFunding: String(proposal.args.currentFunding),
            newDecisionStatus: Number(proposal.args.decisionStatus),
          });
        } else if (proposal.eventName == "MainContract__ProposalFunded") {
          await updateProposal({
            proposalId: Number(proposal.args.proposalId),
            additionalFunding: Number(proposal.args.fundingAmount),
          });
        }
      }

      console.log("this is arrayToMongoDb:", arrayToMongoDb);

      if (arrayToMongoDb.length > 0) {
        await ProposalModel.insertMany(arrayToMongoDb);
        console.log("Added new proposals to DB");
      }

      console.log("BLOCK IS CONFIRMED AND DATA IS ADDED TO DB!");
    }
    return Response.json("request is confirmed", { status: 200 });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return Response.json(`Error processing POST request:${error}`, {
      status: 500,
    });
  }
}
