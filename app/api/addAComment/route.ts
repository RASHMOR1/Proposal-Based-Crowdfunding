import { updateProposal } from "@/app/serverActions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("ok, im in post");

    // Extract data from the request body
    const data = await req.json();
    console.log("this is json:", data);
    console.log("this is proposal id from api:", data.proposalId);

    await updateProposal(data);

    // Respond with a success message
    return NextResponse.json(
      { success: true, message: "Proposal updated successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Narrow down the type of error
    if (error instanceof Error) {
      console.error("Error processing POST request:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unexpected error:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
