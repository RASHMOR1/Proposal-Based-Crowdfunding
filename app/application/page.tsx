"use client";
import { useEffect, useState } from "react";
import { Proposal, SearchField } from "../../components/";
import { fetchAllProposals } from "../serverActions";
import {
  ProposalDataFromMongo,
  FullProposalData,
} from "@/interfaces/Interfaces";
import Link from "next/link";

const CACHE_DURATION = 1 * 60 * 1000; // 3 minutes

const App: React.FC = () => {
  const [allProposals, setAllProposals] = useState<FullProposalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProposals, setTotalProposals] = useState(0);
  const proposalsPerPage = 12;
  const totalPages = Math.ceil(totalProposals / proposalsPerPage);

  const getProposals = async (page: number) => {
    try {
      const cachedProposals = localStorage.getItem(
        `allProposals-${page}-${searchTerm}`
      );
      const cachedTimestamp = localStorage.getItem(
        `proposalsTimestamp-${page}-${searchTerm}`
      );

      if (cachedProposals && cachedTimestamp) {
        const currentTime = new Date().getTime();
        const cacheTime = new Date(parseInt(cachedTimestamp)).getTime();

        if (currentTime - cacheTime < CACHE_DURATION) {
          const parsedProposals = JSON.parse(cachedProposals);
          setAllProposals(parsedProposals.proposals);
          setTotalProposals(parsedProposals.total);
          setLoading(false);
          console.log("Loaded from cache:", parsedProposals);
          return;
        }
      }

      console.log(
        `Fetching proposals for page: ${page} with searchTerm: ${searchTerm}`
      );
      const response = await fetch("/api/findProposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm, page, limit: proposalsPerPage }), // Pass the search term and pagination
      });

      if (!response.ok) {
        throw new Error("Failed to fetch proposals");
      }

      const resData = await response.json();
      setAllProposals(resData.proposals);
      setTotalProposals(resData.total);
      localStorage.setItem(
        `allProposals-${page}-${searchTerm}`,
        JSON.stringify(resData)
      );
      localStorage.setItem(
        `proposalsTimestamp-${page}-${searchTerm}`,
        new Date().getTime().toString()
      );
      setLoading(false);
      console.log("Fetched proposals data:", resData);
    } catch (error) {
      console.error("Error fetching proposals:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProposals(currentPage);
  }, [searchTerm, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setLoading(true);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
    setLoading(true);
  };

  return (
    <div>
      <div className="flex justify-around items-center w-full">
        <div className="w-3/4">
          <SearchField
            searchTerm={searchTerm}
            setSearchTerm={handleSearchChange}
          />
        </div>
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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allProposals.map((proposal: FullProposalData, index: number) => (
            <Proposal key={index} data={proposal} />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          className="p-3 m-2 violet transition duration-150 ease-in-out transform active:scale-90 text-white rounded-2xl  hover:cursor-pointer"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`p-3 m-2  text-white transition duration-150 ease-in-out transform active:scale-90 rounded-xl hover:cursor-pointer ${
              currentPage === index + 1 ? "violet" : "lightViolet"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="p-3 transition duration-150 ease-in-out transform active:scale-90 m-2 violet text-white rounded-2xl hover:cursor-pointer"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
