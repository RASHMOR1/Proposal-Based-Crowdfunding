# Reverse Crowdfunding Platform

This project is a blockchain-based crowdfunding platform with a unique twist. Unlike traditional crowdfunding where companies propose projects and seek funding from users, here, regular users make proposals to companies. If a company agrees to execute the proposal and sets a funding goal, the crowdfunding process automatically starts.

Creating a proposal costs 10 mock USDT tokens, and users can earn 0.1 mock USDT tokens by removing outdated proposals.

Visit app on https://proposal-based-crowdfunding.vercel.app/

## Setting Up Moralis Streams

This project uses Moralis Streams for real-time blockchain data processing. To recreate the setup, you need to create a stream on Moralis that links to the api/addToMongoDb endpoint.

1. Sign up for Moralis: If you don’t have an account, sign up at Moralis.

2. Create a New Stream:

   1. Go to the Moralis Streams section.
   2. Create a new stream and configure it to monitor the blockchain events relevant to your project.
   3. Set the webhook URL to point to your API endpoint: https://yourdomain.com/api/addToMongoDb.
   4. Configure Webhook: Ensure that your API endpoint is set up to handle incoming requests from Moralis and process the blockchain data accordingly.

## Environment Variables

Create a .env file in the root of your project and add the following lines:

```
MONGODB_URI=your-mongodb-uri
NEXT_PUBLIC_PROJECT_ID=your-wallet-connect-project-id
NEXT_PUBLIC_SEPOLIA_RPC_URL=your-sepolia-rpc-url
```

MONGODB_URI: Replace your-mongodb-uri with the actual URI of your MongoDB instance. This URI is used to connect your application to your MongoDB database.

NEXT_PUBLIC_PROJECT_ID: Replace your-wallet-connect-project-id with the actual project ID from your WalletConnect . This ID is used to integrate WalletConnect in your application, allowing users to connect their wallets securely. [Get your project Id](https://cloud.walletconnect.com/sign-in)

NEXT_PUBLIC_SEPOLIA_RPC_URL: Replace your-sepolia-rpc-url with the actual RPC URL for the Sepolia network. This URL is used to connect to the

## Smart contract repository

You can access the smart contract repository via the following link: [Smart-Contracts-Proposal-Based-CrowdFunding.](https://github.com/RASHMOR1/Smart-Contracts-Proposal-Based-CrowdFunding)
