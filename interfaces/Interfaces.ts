export interface ProposalData {
  proposalId: number;
  toCompanyAddress: string;
  fromAddress: string;
  proposalURI: string;
  decisionStatus: number;
  fundingGoal: number;
  currentFunding: number;
  deadline: number;
  comment: string;
}
export interface ProposalDataFromMongo {
  //_id: ObjectId; // Using ObjectId to match MongoDB's ObjectId type
  _id: string;
  proposalId: number;
  toCompanyAddress: string;
  fromAddress: string;
  proposalURI: string;
  decisionStatus: number;
  fundingGoal: string;
  currentFunding: string;
  deadline: string;
  comment?: string;
  // __v: number;
  // createdAt: Date; // Using Date type for timestamps
  // updatedAt: Date; // Using Date type for timestamps
}

export interface ProposalDataFromMongoSchema {
  //_id: ObjectId;
  _id: string;
  proposalId: number;
  toCompanyAddress: string;
  fromAddress: string;
  proposalURI: string;
  decisionStatus: number;
  fundingGoal: number;
  currentFunding: number;
  deadline: number;
  createdAt?: Date;
  updatedAt?: Date;
  comment?: string;
}

export interface IpfsData {
  address: string;
  title: string;
  proposal: string;
}

export interface FullProposalData {
  _id: string;
  proposalId: number;
  toCompanyAddress: string;
  fromAddress: string;
  proposalURI: string;
  decisionStatus: number;
  fundingGoal: string;
  currentFunding: string;
  deadline: string;
  __v?: number;
  createdAt?: Date;
  updatedAt?: Date;
  comment?: string;
  ipfsData?: IpfsData;
}

export interface TopicInterface {
  eventName: string;
  args: {
    proposalId: bigint;
    toCompanyAddress: string;
    fromAddress: string;
    proposalURI: string;
    decisionStatus: number;
    fundingGoal: bigint;
    currentFunding: bigint;
    deadline: bigint;
    comment: string;
  };
}
