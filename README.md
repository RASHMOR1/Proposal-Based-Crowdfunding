# Reverse Crowdfunding Platform

This project is a blockchain-based crowdfunding platform with a unique twist. Unlike traditional crowdfunding where companies propose projects and seek funding from users, here, regular users make proposals to companies. If a company agrees to execute the proposal and sets a funding goal, the crowdfunding process automatically starts.

## Setting Up Moralis Streams

This project uses Moralis Streams for real-time blockchain data processing. To recreate the setup, you need to create a stream on Moralis that links to the api/addToMongoDb endpoint.

1. Sign up for Moralis: If you don’t have an account, sign up at Moralis.

2. Create a New Stream:

   1. Go to the Moralis Streams section.
   2. Create a new stream and configure it to monitor the blockchain events relevant to your project.
   3. Set the webhook URL to point to your API endpoint: https://yourdomain.com/api/addToMongoDb.
   4. Configure Webhook: Ensure that your API endpoint is set up to handle incoming requests from Moralis and process the blockchain data accordingly.

## Environment Variables

To connect to your MongoDB database, you need to populate the .env file with the MongoDB URI. Create a .env file in the root of your project and add the following line:

```
MONGODB_URI=your-mongodb-uri
```

Replace your-mongodb-uri with the actual URI of your MongoDB instance.

## Smart contract repository

You can access the smart contract repository via the following link: [Smart-Contracts-Proposal-Based-CrowdFunding.](https://github.com/RASHMOR1/Smart-Contracts-Proposal-Based-CrowdFunding)
