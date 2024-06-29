//import React, { useState, useEffect } from "react";
//import { fetchProposals } from "../app/testServerSide";
import {
  FullProposalData,
  ProposalDataFromMongo,
} from "@/interfaces/Interfaces";
import { Proposal } from "@/components";

interface SearchFieldProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <input
          type="text"
          name="search"
          id="search"
          className="shadow-xl shadow-slate-200 rounded-2xl w-3/4 mr-2 p-3 outline-none"
          placeholder="Search...."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button
          className="p-3 violet m-0 text-white rounded-2xl  hover:cursor-pointer"
          onClick={() => setSearchTerm(searchTerm)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchField;
