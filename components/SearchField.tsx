"use client";
import React, { useState, useEffect } from "react";
import { fetchProposals } from "../app/serverActions";
import {
  FullProposalData,
  ProposalDataFromMongo,
} from "@/interfaces/Interfaces";
import { Proposal } from "@/components";

const SearchField: React.FC = () => {
  const [quotesArr, setQuotesArr] = useState<ProposalDataFromMongo[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function getQuote() {
    // try {
    //   let arr = await fetchProposals(searchTerm);
    //   setQuotesArr(arr);
    //   setSearchTerm("");
    //   console.log("this is what was fetched:", arr);
    // } catch (error) {
    //   console.error("Error fetching quotes:", error);
    // }
  }

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          name="search"
          id="search"
          className="shadow-xl shadow-slate-500 w-[75%] h-10 p-2 outline-none"
          placeholder="Search...."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button
          className="p-2 text-white bg-orange-500 hover:cursor-pointer"
          onClick={getQuote}
        >
          Search
        </button>
      </div>

      {/* <div className="m-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {quotesArr && quotesArr.length > 0 ? (
            quotesArr.map((proposal: ProposalDataFromMongo, index: number) => (
              <Proposal key={index} data={proposal}></Proposal>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default SearchField;
