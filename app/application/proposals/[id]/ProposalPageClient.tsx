"use client";

import { useState, useEffect, useRef } from "react";
import { FullProposalData } from "../../../../interfaces/Interfaces";
import "../../../globals.css";
import {
  decisionText,
  mockUsdtAddress,
  mainContractAddress,
} from "@/constants/constants";
import { GetBackButton } from "@/components";
// import GetBackButton from "@/components/GetBackButton";

import { parseData } from "@/app/serverActions";
import { getAccount } from "@wagmi/core";
import {
  getAllowanceInteraction,
  fundProposalInteraction,
  approveMockUsdtInteraction,
} from "../../../blockchainInteractions";

import { ModalDeny, ModalAccept } from "@/components";

const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
};
export default function ProposalPageClient({
  proposalData,
}: {
  proposalData: FullProposalData;
}) {
  const [fundingAmount, setFundingAmount] = useState("5");
  //const [data, setData] = useState<FullProposalData | null>(proposalData);
  const [isAllowanceEnough, setIsAllowanceEnough] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [openModalAccept, setOpenModalAccept] = useState(false);
  const [openModalDeny, setOpenModalDeny] = useState(false);
  // const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
  const [proposalDecisionMade, setProposalDecisionMade] = useState(false);
  const account = getAccount();
  const userAddress = account.address;
  const data: FullProposalData = proposalData;

  const acceptRef = useRef<HTMLDivElement>(null);
  const denyRef = useRef<HTMLDivElement>(null);

  if (!data) {
    return <div>Error loading proposal data.</div>;
  }

  const getAllowanceAmount = async () => {
    const allowance = await getAllowanceInteraction(
      userAddress as `0x${string}`
    );
    if (allowance > Number(fundingAmount) * 1000) {
      setIsAllowanceEnough(true);
      console.log("allowance is enough");
    }
  };

  const fundProposal = async () => {
    const transaction = await fundProposalInteraction(
      proposalData.proposalId,
      Number(fundingAmount)
    );
    console.log("set this transaction hash:", transaction?.transactionHash);

    console.log("this is the data from wait for the transaction", transaction);
    setTransactionHash(String(transaction?.transactionHash));
  };

  useEffect(() => {
    getAllowanceAmount();
  }, [fundingAmount]);

  useEffect(() => {
    if (openModalAccept) {
      scrollToSection(acceptRef);
    }
  }, [openModalAccept]);
  useEffect(() => {
    if (openModalDeny) {
      scrollToSection(acceptRef);
    }
  }, [openModalDeny]);
  useEffect(() => {
    console.log("proposalDecisionMade:", proposalDecisionMade);
  }, [proposalDecisionMade]);
  return (
    <main className="flex w-lvw items-center flex-col">
      <GetBackButton />

      <div className="w-11/12 min-w-96 sm:w-9/10 md:w-4/5 lg:w-4/5 max-w-7xl flex flex-col mt-10 mb-10 border border-4 rounded-2xl p-8 border-violet-600">
        <div className="flex justify-between">
          {
            <div className="flex flex-col my-2">
              <div
                className={
                  "p-1 rounded-2xl p-3 " +
                  (data.decisionStatus == 0
                    ? "bg-yellow-300 text-slate-600"
                    : data.decisionStatus == 1
                      ? "bg-blue-500 text-white"
                      : data.decisionStatus == 2
                        ? "bg-red-600 text-white"
                        : data.decisionStatus == 3
                          ? "bg-green-500 text-white"
                          : data.decisionStatus == 4
                            ? "bg-red-600 text-white"
                            : "")
                }
              >
                {decisionText[Number(proposalData?.decisionStatus)]}
              </div>
            </div>
          }
          <h3 className="violet text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
            {proposalData?.proposalId}
          </h3>
        </div>
        <div className="flex flex-col my-2">
          <h2 className="my-1">Proposal From:</h2>
          <div className="lightViolet w-full border rounded-xl p-2 break-all">
            {proposalData?.fromAddress}
          </div>
        </div>
        <div className="flex flex-col my-2">
          <h2 className="my-1">Proposal To:</h2>
          <div className="lightViolet w-full border rounded-xl p-2 break-all">
            {proposalData?.toCompanyAddress}
          </div>
        </div>
        <div className="flex flex-col my-2">
          <h2 className="my-1">Proposal Title:</h2>
          <div className="lightViolet w-full border rounded-xl p-2 break-all">
            {proposalData?.ipfsData?.title}
          </div>
        </div>

        {proposalData?.decisionStatus != 0 && (
          <div className="flex flex-col my-2">
            <h2 className="my-1">Funding Goal:</h2>
            <div className="lightViolet w-full border rounded-xl p-2 break-all">
              {proposalData?.fundingGoal} USDT
            </div>
          </div>
        )}
        {proposalData?.decisionStatus != 0 &&
          proposalData?.decisionStatus != 2 && (
            <div className="flex flex-col my-2">
              <h2 className="my-1">Current Funding:</h2>
              <div className="lightViolet w-full border rounded-xl p-2 break-all">
                {proposalData?.currentFunding} USDT
              </div>
            </div>
          )}
        {proposalData?.decisionStatus != 0 &&
          proposalData?.decisionStatus != 2 && (
            <div className="flex flex-col my-2">
              <h2 className="my-1">Deadline:</h2>
              <div className="lightViolet w-full border rounded-xl p-2 break-words">
                {parseData(Number(proposalData?.deadline))}
              </div>
            </div>
          )}
        <div className="flex flex-col my-2">
          <h2 className="my-1">Proposal text:</h2>
          <div className="lightViolet w-full border rounded-xl p-2 break-all">
            {proposalData?.ipfsData?.proposal}
          </div>
        </div>
        {proposalData?.decisionStatus == 2 && proposalData?.comment?.length && (
          <div className="flex flex-col my-2">
            <h2 className="my-1">Company Response:</h2>
            <div className="lightViolet w-full border rounded-xl p-2 break-all">
              {proposalData?.comment}
            </div>
          </div>
        )}
        {/* {proposalData?.comment?.length && (
          <div className="flex flex-col my-2">
            <h2 className="my-1">Company response:</h2>
            <div className="lightViolet w-full border rounded-xl p-2">
              {proposalData?.comment}
            </div>
          </div>
        )} */}
        <div className="flex justify-around flex-col sm:flex-row">
          {proposalData?.decisionStatus == 1 && (
            <div className="flex justify-between items-center mt-4 border border-2 border-violet-500 p-2 rounded-2xl">
              <div className="flex justify-left items-center ">
                <input
                  type="number"
                  value={fundingAmount}
                  onChange={(e) => {
                    setFundingAmount(e.target.value);
                  }}
                  className="mr-4 w-3/12 rounded-2xl p-2 border border-2 border-violet-500 focus:outline-none "
                />
                <h3>USDT</h3>
              </div>
              {isAllowanceEnough ? (
                <button
                  className="violet m-0 p-3 w-fit rounded-lg cursor-pointer text-white transition duration-150 ease-in-out transform active:scale-90"
                  onClick={(e) => {
                    e.preventDefault();
                    fundProposal();
                  }}
                >
                  Fund Proposal
                </button>
              ) : (
                <button
                  className="violet m-0 p-3 w-fit rounded-lg cursor-pointer text-white transition duration-150 ease-in-out transform active:scale-90"
                  onClick={(e) => {
                    e.preventDefault();
                    approveMockUsdtInteraction(Number(fundingAmount));
                  }}
                >
                  Approve
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {proposalData?.decisionStatus == 0 && (
        <div className="w-11/12 min-w-96 sm:w-9/10 md:w-4/5 lg:w-4/5 max-w-7xl">
          {userAddress == proposalData?.toCompanyAddress && (
            <div className="flex sm:flex-row flex-col mb-10">
              <div className="sm:w-4/5 md:w-3/5 w-full mb-6">
                <div className="flex justify-center items-center">
                  <button
                    className="p-3 bg-green-500 my-2 w-fit rounded-lg cursor-pointer text-white transition duration-150 ease-in-out transform active:scale-90"
                    onClick={() => {
                      setOpenModalAccept((prev) => !prev);
                      scrollToSection(acceptRef);
                    }}
                  >
                    Accept Proposal
                  </button>
                </div>
                <div
                  ref={acceptRef}
                  className="flex justify-center items-center"
                >
                  {openModalAccept && (
                    <ModalAccept
                      proposalId={Number(proposalData?.proposalId)}
                      proposalDecisionMade={proposalDecisionMade}
                      setProposalDecisionMade={setProposalDecisionMade}
                    />
                  )}
                </div>
              </div>
              <div className="sm:w-4/5 md:w-3/5 w-full mb-6">
                <div className="flex justify-center items-center">
                  <button
                    className="p-3 bg-red-600 my-6 sm:my-2 w-fit rounded-lg cursor-pointer text-white transition duration-150 ease-in-out transform active:scale-90"
                    onClick={() => {
                      setOpenModalDeny((prev) => !prev);
                    }}
                  >
                    Deny Proposal
                  </button>
                </div>
                <div ref={denyRef} className="flex justify-center items-center">
                  {openModalDeny && (
                    <ModalDeny
                      proposalId={Number(proposalData?.proposalId)}
                      proposalDecisionMade={proposalDecisionMade}
                      setProposalDecisionMade={setProposalDecisionMade}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FullProposalData } from "../../../../interfaces/Interfaces";
// import "../../../globals.css";
// import { decisionText } from "@/constants/constants";
// import { GetBackButton } from "@/components";
// import { parseData } from "@/app/serverActions";
// import { getAccount } from "@wagmi/core";
// import {
//   getAllowanceInteraction,
//   fundProposalInteraction,
//   approveMockUsdtInteraction,
// } from "../../../blockchainInteractions";
// import { ModalDeny, ModalAccept } from "@/components";

// // const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
// //   if (ref.current) {
// //     ref.current.scrollIntoView({ behavior: "smooth" });
// //   }
// // };

// export default function ProposalPageClient({
//   proposalData,
// }: {
//   proposalData: FullProposalData;
// }) {
//   const [fundingAmount, setFundingAmount] = useState("5");
//   const [isAllowanceEnough, setIsAllowanceEnough] = useState(false);
//   // const [transactionHash, setTransactionHash] = useState("");
//   // const [openModalAccept, setOpenModalAccept] = useState(false);
//   // const [openModalDeny, setOpenModalDeny] = useState(false);
//   // const [proposalDecisionMade, setProposalDecisionMade] = useState(false);
//   const account = getAccount();
//   const userAddress = account.address;
//   const data: FullProposalData = proposalData;

//   const acceptRef = useRef<HTMLDivElement>(null);
//   const denyRef = useRef<HTMLDivElement>(null);

//   if (!data) {
//     return <div>Error loading proposal data.</div>;
//   }

//   const getAllowanceAmount = async () => {
//     const allowance = await getAllowanceInteraction(
//       userAddress as `0x${string}`
//     );
//     if (allowance > Number(fundingAmount) * 1000) {
//       setIsAllowanceEnough(true);
//       console.log("allowance is enough");
//     }
//   };

//   const fundProposal = async () => {
//     const transaction = await fundProposalInteraction(
//       proposalData.proposalId,
//       Number(fundingAmount)
//     );
//     console.log("set this transaction hash:", transaction?.transactionHash);
//     console.log("this is the data from wait for the transaction", transaction);
//     setTransactionHash(String(transaction?.transactionHash));
//   };

//   // useEffect(() => {
//   //   const getAllowanceAmount = async () => {
//   //     const allowance = await getAllowanceInteraction(
//   //       userAddress as `0x${string}`
//   //     );
//   //     if (allowance > Number(fundingAmount) * 1000) {
//   //       setIsAllowanceEnough(true);
//   //       console.log("allowance is enough");
//   //     }
//   //   };

//   //   getAllowanceAmount();
//   // }, [fundingAmount, userAddress]);

//   // useEffect(() => {
//   //   if (openModalAccept) {
//   //     scrollToSection(acceptRef);
//   //   }
//   // }, [openModalAccept]);

//   // useEffect(() => {
//   //   if (openModalDeny) {
//   //     scrollToSection(denyRef);
//   //   }
//   // }, [openModalDeny]);

//   // useEffect(() => {
//   //   getAllowanceAmount();
//   // }, [fundingAmount]);

//   // useEffect(() => {
//   //   if (openModalAccept) {
//   //     scrollToSection(acceptRef);
//   //   }
//   // }, [openModalAccept]);

//   // useEffect(() => {
//   //   if (openModalDeny) {
//   //     scrollToSection(denyRef);
//   //   }
//   // }, [openModalDeny]);

//   return (
//     <main className="flex w-lvw items-center flex-col">
//       <GetBackButton />

//       <div className="w-11/12 min-w-96 sm:w-9/10 md:w-4/5 lg:w-4/5 max-w-7xl flex flex-col mt-10 mb-10 border border-4 rounded-2xl p-8 border-violet-600">
//         <div className="flex justify-between">
//           <div className="flex flex-col my-2">
//             <div
//               className={
//                 "p-1 rounded-2xl p-3 " +
//                 (data.decisionStatus === 0
//                   ? "bg-yellow-300 text-slate-600"
//                   : data.decisionStatus === 1
//                     ? "bg-blue-500 text-white"
//                     : data.decisionStatus === 2
//                       ? "bg-red-600 text-white"
//                       : data.decisionStatus === 3
//                         ? "bg-green-500 text-white"
//                         : data.decisionStatus === 4
//                           ? "bg-red-600 text-white"
//                           : "")
//               }
//             >
//               {decisionText[Number(proposalData?.decisionStatus)]}
//             </div>
//           </div>
//           <h3 className="violet text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
//             {proposalData?.proposalId}
//           </h3>
//         </div>
//         <div className="flex flex-col my-2">
//           <h2 className="my-1">Proposal From:</h2>
//           <div className="lightViolet w-full border rounded-xl p-2 break-all">
//             {proposalData?.fromAddress}
//           </div>
//         </div>
//         <div className="flex flex-col my-2">
//           <h2 className="my-1">Proposal To:</h2>
//           <div className="lightViolet w-full border rounded-xl p-2 break-all">
//             {proposalData?.toCompanyAddress}
//           </div>
//         </div>
//         <div className="flex flex-col my-2">
//           <h2 className="my-1">Proposal Title:</h2>
//           <div className="lightViolet w-full border rounded-xl p-2 break-all">
//             {proposalData?.ipfsData?.title}
//           </div>
//         </div>

//         {proposalData?.decisionStatus !== 0 && (
//           <div className="flex flex-col my-2">
//             <h2 className="my-1">Funding Goal:</h2>
//             <div className="lightViolet w-full border rounded-xl p-2 break-all">
//               {proposalData?.fundingGoal} USDT
//             </div>
//           </div>
//         )}
//         {proposalData?.decisionStatus !== 0 &&
//           proposalData?.decisionStatus !== 2 && (
//             <div className="flex flex-col my-2">
//               <h2 className="my-1">Current Funding:</h2>
//               <div className="lightViolet w-full border rounded-xl p-2 break-all">
//                 {proposalData?.currentFunding} USDT
//               </div>
//             </div>
//           )}
//         {proposalData?.decisionStatus !== 0 &&
//           proposalData?.decisionStatus !== 2 && (
//             <div className="flex flex-col my-2">
//               <h2 className="my-1">Deadline:</h2>
//               <div className="lightViolet w-full border rounded-xl p-2 break-words">
//                 {parseData(Number(proposalData?.deadline))}
//               </div>
//             </div>
//           )}
//         <div className="flex flex-col my-2">
//           <h2 className="my-1">Proposal text:</h2>
//           <div className="lightViolet w-full border rounded-xl p-2 break-all">
//             {proposalData?.ipfsData?.proposal}
//           </div>
//         </div>
//         {proposalData?.decisionStatus === 2 &&
//           proposalData?.comment?.length && (
//             <div className="flex flex-col my-2">
//               <h2 className="my-1">Company Response:</h2>
//               <div className="lightViolet w-full border rounded-xl p-2 break-all">
//                 {proposalData?.comment}
//               </div>
//             </div>
//           )}

//         <div className="flex justify-around flex-col sm:flex-row">
//           {proposalData?.decisionStatus === 1 && (
//             <div className="flex justify-between items-center mt-4 border border-2 border-violet-500 p-2 rounded-2xl">
//               <div className="flex justify-left items-center">
//                 <input
//                   type="number"
//                   value={fundingAmount}
//                   onChange={(e) => setFundingAmount(e.target.value)}
//                   className="mr-4 w-3/12 rounded-2xl p-2 border border-2 border-violet-500 focus:outline-none"
//                 />
//                 <h3>USDT</h3>
//               </div>
//               {isAllowanceEnough ? (
//                 <button
//                   className="violet m-0 p-3 w-fit rounded-lg cursor-pointer text-white transition duration-150 ease-in-out transform active:scale-90"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     fundProposal();
//                   }}
//                 >
//                   Fund Proposal
//                 </button>
//               ) : (
//                 <button
//                   className="violet m-0 p-3 w-fit rounded-lg cursor-pointer text-white transition duration-150 ease-in-out transform active:scale-90"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     approveMockUsdtInteraction(Number(fundingAmount));
//                   }}
//                 >
//                   Approve
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {proposalData?.decisionStatus === 0 &&
//         userAddress === proposalData?.toCompanyAddress && (
//           <div className="w-11/12 min-w-96 sm:w-9/10 md:w-4/5 lg:w-4/5 max-w-7xl">
//             <div className="flex sm:flex-row flex-col mb-10">
//               <div className="sm:w-4/5 md:w-3/5 w-full mb-6">
//                 <div className="flex justify-center items-center">
//                   <button
//                     className="p-3 bg-green-500 my-2 w-fit rounded-lg cursor-pointer text-white transition duration-150 ease-in-out transform active:scale-90"
//                     onClick={() => {
//                       setOpenModalAccept((prev) => !prev);
//                     }}
//                   >
//                     Accept Proposal
//                   </button>
//                 </div>
//                 {/* <div
//                   ref={acceptRef}
//                   className="flex justify-center items-center"
//                 >
//                   {openModalAccept && (
//                     <ModalAccept
//                       proposalId={Number(proposalData?.proposalId)}
//                       proposalDecisionMade={proposalDecisionMade}
//                       setProposalDecisionMade={setProposalDecisionMade}
//                     />
//                   )}
//                 </div>
//               </div>
//               <div className="sm:w-4/5 md:w-3/5 w-full mb-6">
//                 <div className="flex justify-center items-center">
//                   <button
//                     className="p-3 bg-red-600 my-6 sm:my-2 w-fit rounded-lg cursor-pointer text-white transition duration-150 ease-in-out transform active:scale-90"
//                     onClick={() => {
//                       setOpenModalDeny((prev) => !prev);
//                     }}
//                   >
//                     Deny Proposal
//                   </button>
//                 </div>
//                 <div ref={denyRef} className="flex justify-center items-center">
//                   {openModalDeny && (
//                     <ModalDeny
//                       proposalId={Number(proposalData?.proposalId)}
//                       proposalDecisionMade={proposalDecisionMade}
//                       setProposalDecisionMade={setProposalDecisionMade}
//                     />
//                   )}
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         )}
//     </main>
//   );
// }
