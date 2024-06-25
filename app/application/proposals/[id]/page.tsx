import {
  FullProposalData,
  ProposalData,
} from "../../../../interfaces/Interfaces";
import "../../../globals.css";
import { getData, parseData } from "@/app/serverActions";
import ProposalPageClient from "./ProposalPageClient";

const ProposalPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const proposalData: FullProposalData | null = await getData(Number(id));
  console.log("this is proposal data:", proposalData);

  if (!proposalData) {
    return <div>Error loading proposal data.</div>;
  }

  return <ProposalPageClient proposalData={proposalData} />;
};

export default ProposalPage;
