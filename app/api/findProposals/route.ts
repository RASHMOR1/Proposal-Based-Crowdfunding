import { readIpfs } from "@/app/serverActions";
import connectDB from "../../mongodb/connectToDB";
import ProposalModel from "../../mongodb/proposalSchema";

export async function POST(req: Request) {
  try {
    const { searchTerm, page, limit } = await req.json();
    await connectDB();
    console.log(
      "Search term received:",
      searchTerm,
      "Page:",
      page,
      "Limit:",
      limit
    );

    const convertToLowerCase = (text: string) => {
      return text.replace(/[A-Z]/g, (match) => match.toLowerCase());
    };

    const convertFirstLetterToCapital = (text: string) => {
      return text.replace(/(^\w{1})|(\.\s*\w{1})/g, (match) =>
        match.toUpperCase()
      );
    };

    const searchTermLower = convertToLowerCase(searchTerm);
    const searchTermFirst = convertFirstLetterToCapital(searchTerm);

    const searchTermNumber = !isNaN(Number(searchTerm))
      ? Number(searchTerm)
      : null;

    let query: any = {
      $or: [
        { toCompanyAddress: { $regex: searchTermLower, $options: "i" } },
        { toCompanyAddress: { $regex: searchTerm, $options: "i" } },
        { toCompanyAddress: { $regex: searchTermFirst, $options: "i" } },
        { fromAddress: { $regex: searchTermLower, $options: "i" } },
        { fromAddress: { $regex: searchTerm, $options: "i" } },
        { fromAddress: { $regex: searchTermFirst, $options: "i" } },
      ],
    };

    if (
      searchTermLower === "pending" ||
      searchTermLower === "pendin" ||
      searchTermLower === "pendi" ||
      searchTermLower === "pend"
    ) {
      query = { decisionStatus: 0 };
    } else if (
      searchTermLower === "accepted" ||
      searchTermLower === "accepte" ||
      searchTermLower === "accept" ||
      searchTermLower === "accep" ||
      searchTermLower === "acce" ||
      searchTermLower === "acc"
    ) {
      query = { decisionStatus: 1 };
    } else if (
      searchTermLower === "rejected" ||
      searchTermLower === "rejecte" ||
      searchTermLower === "reject" ||
      searchTermLower === "rejec" ||
      searchTermLower === "reje" ||
      searchTermLower === "rej"
    ) {
      query = { decisionStatus: 2 };
    } else if (
      searchTermLower === "successfullu funded" ||
      searchTermLower === "successfully" ||
      searchTermLower === "funded" ||
      searchTermLower === "success" ||
      searchTermLower === "funde"
    ) {
      query = { decisionStatus: 3 };
    } else if (
      searchTermLower === "outdated" ||
      searchTermLower === "outdate" ||
      searchTermLower === "outdat" ||
      searchTermLower === "outda" ||
      searchTermLower === "outd"
    ) {
      query = { decisionStatus: 3 };
    }

    if (searchTermNumber !== null) {
      query.$or.push({ proposalId: searchTermNumber });
    }

    if (searchTerm === "") {
      query = {};
    }

    try {
      const total = await ProposalModel.countDocuments(query);
      const returnData = await ProposalModel.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      const proposalsWithIpfsData = await Promise.all(
        returnData.map(async (data) => {
          try {
            const ipfsData = await readIpfs(data.proposalURI);
            return { ...data, ipfsData };
          } catch (ipfsError) {
            console.error("Error reading IPFS data:", ipfsError);
            throw new Error("Failed to read IPFS data");
          }
        })
      );

      return new Response(
        JSON.stringify({ proposals: proposalsWithIpfsData, total }),
        { status: 200 }
      );
    } catch (dbError) {
      console.error("Error fetching proposals from the database:", dbError);
      throw new Error("Failed to fetch proposals from the database");
    }
  } catch (error) {
    console.error("Error processing POST request:", error);

    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return new Response(
      JSON.stringify({
        error: `Error processing POST request: ${errorMessage}`,
      }),
      {
        status: 500,
      }
    );
  }
}
