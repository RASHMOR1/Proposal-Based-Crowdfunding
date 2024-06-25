import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("ok, im in post");

  // Extract data from the request body

  const form = await new Response(req.body).json();
  console.log("this is form in post:", form);

  const JWT = process.env.PINATA_JWT;

  const formData = new FormData();
  formData.append(
    "file",
    new Blob([JSON.stringify(form)], { type: "application/json" })
  );
  const response = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: formData,
    }
  );

  // Handle the response from Pinata
  const data = await response.json();
  console.log("this is original response:", response);
  console.log("pinata reponse:", data);

  // Respond with the data returned by Pinata
  return NextResponse.json(data, { status: 200 });
}
