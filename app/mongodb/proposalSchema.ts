import { Document, Model, Schema, model, models } from "mongoose";
import mongoose from "mongoose";

interface IProposalDocument extends Document {
  proposalId: number;
  toCompanyAddress: string;
  fromAddress: string;
  proposalURI: string;
  decisionStatus: number;
  fundingGoal: string;
  currentFunding: string;
  deadline: string;
  comment?: string; // Making this field optional
}

const proposalSchema: Schema<IProposalDocument> = new Schema(
  {
    proposalId: {
      type: Number,
      required: true,
      unique: true, // Ensure unique proposalId
    },
    toCompanyAddress: {
      type: String,
      required: true,
    },
    fromAddress: {
      type: String,
      required: true,
    },
    proposalURI: {
      type: String,
      required: true,
    },
    decisionStatus: {
      type: Number,
      required: true,
    },
    fundingGoal: {
      type: String,
      required: true,
    },
    currentFunding: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      default: "", // Default to an empty string
    },
  },
  { timestamps: true }
);

const ProposalModel: Model<IProposalDocument> =
  mongoose.models?.proposals ||
  mongoose.model<IProposalDocument>("proposals", proposalSchema);

export default ProposalModel;
