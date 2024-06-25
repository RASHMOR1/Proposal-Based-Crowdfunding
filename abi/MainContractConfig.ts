export const MainContractConfig = {
  address: "0x832acC35981950a7e3B31AB2792aAe8903703DF9",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_usdtTokenAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [{ internalType: "address", name: "target", type: "address" }],
      name: "AddressEmptyCode",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "AddressInsufficientBalance",
      type: "error",
    },
    { inputs: [], name: "FailedInnerCall", type: "error" },
    {
      inputs: [],
      name: "MainContract__NotAllowedToPerformThisAction",
      type: "error",
    },
    {
      inputs: [],
      name: "MainContract__NotEnoughCommissionAccumulated",
      type: "error",
    },
    { inputs: [], name: "MainContract__ProposalDoesNotExist", type: "error" },
    {
      inputs: [],
      name: "MainContract__ProposalIsNotInAcceptedStatus",
      type: "error",
    },
    {
      inputs: [],
      name: "MainContract__ProposalIsNotRejected",
      type: "error",
    },
    { inputs: [], name: "MainContract__ProposalIsOutdated", type: "error" },
    {
      inputs: [],
      name: "MainContract__ProposalIsStillActive",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "SafeERC20FailedOperation",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "commissionAmount",
          type: "uint256",
        },
      ],
      name: "MainContract__CommissionWithdrawn",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "amountWithdrawn",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "timeStamp",
          type: "uint256",
        },
      ],
      name: "MainContract__CompanyExecutingProposal",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "toCompanyAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "string",
          name: "proposalURI",
          type: "string",
        },
      ],
      name: "MainContract__ProposalCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "fundingAmount",
          type: "uint256",
        },
      ],
      name: "MainContract__ProposalFunded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "enum MainContract.Decision",
          name: "decision",
          type: "uint8",
        },
      ],
      name: "MainContract__ProposalStatusChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "MainContract__RefundIssued",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [
        { internalType: "uint256", name: "proposalId", type: "uint256" },
      ],
      name: "cleanOutdatedProposals",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "proposalId", type: "uint256" },
      ],
      name: "companyExecutingProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "proposalId", type: "uint256" },
        {
          internalType: "enum MainContract.Decision",
          name: "decision",
          type: "uint8",
        },
        { internalType: "uint256", name: "fundingGoal", type: "uint256" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
      ],
      name: "companyMakeDecision",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "toCompanyAddress",
          type: "address",
        },
        { internalType: "string", name: "proposalURI", type: "string" },
      ],
      name: "createProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "currentProposalId",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "proposalId", type: "uint256" },
        { internalType: "uint256", name: "fundingAmount", type: "uint256" },
      ],
      name: "fundProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "lastProposalSerialNumber",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "proposalIdToCompanyAddress",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "proposalIdToCurrentFunding",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "proposalIdToDeadline",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "proposalIdToDecisionStatus",
      outputs: [
        {
          internalType: "enum MainContract.Decision",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "proposalIdToFundingGoal",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "proposalIdToURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "proposalId", type: "uint256" },
      ],
      name: "refundOutdatedProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "proposalId", type: "uint256" },
        {
          internalType: "address",
          name: "contributorAddress",
          type: "address",
        },
      ],
      name: "returnAmountFundedOfTheAddress",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "companyAddress", type: "address" },
        { internalType: "uint256", name: "serialNumber", type: "uint256" },
      ],
      name: "returnSerialNumberOfTheProposalId",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawCommission",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
