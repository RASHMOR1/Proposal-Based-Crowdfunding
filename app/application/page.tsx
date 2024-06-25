import { Proposal, SearchField } from "../../components/";
import { fetchAllProposals } from "../serverActions";
import { ProposalDataFromMongo } from "@/interfaces/Interfaces";
import Link from "next/link";

async function App() {
  let allProposals: ProposalDataFromMongo[];

  try {
    allProposals = await fetchAllProposals();
  } catch (error) {
    console.error("Error fetching proposals:", error);
    allProposals = [];
  }

  console.log("this is all proposals from fetchAllProposals:", allProposals);

  return (
    <div>
      <div className="flex justify-around items-center w-full">
        {/* <SearchField /> */}
        <div className="flex pt-6 pl-6 m-0 justify-end items-center mb-4 mr-4">
          <Link href="/application/create-proposal">
            <div className="relative group">
              <button className="w-12 h-12 p-3 violet m-0 cursor-pointer text-white transition duration-150 ease-in-out transform active:scale-90 rounded-full flex items-center justify-center text-3xl">
                +
              </button>
              <span className="absolute bottom-14 left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-sm text-white mediumViolet rounded hidden group-hover:block">
                Create Proposal
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allProposals.map((proposal: ProposalDataFromMongo, index: number) => (
          <Proposal key={index} data={proposal}></Proposal>
        ))}
      </div>
    </div>
  );
}

export default App;
