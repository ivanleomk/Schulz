import { fetchPlus } from "@/lib/fetch";
import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function POST(req: Request) {
  const body = await req.json();
  const { fileId, uploadId, uploadedParts } = body;

  const baseUrl = process.env.WORKER_URL as string;
  const url = new URL(baseUrl);

  const newJsonBody = JSON.stringify({ parts: uploadedParts });
  console.log(newJsonBody);

  url.pathname = fileId;
  url.searchParams.set("action", "mpu-complete");
  url.searchParams.set("uploadId", uploadId);

  const res = await fetchPlus(url, {
    method: "POST",
    headers: {
      JWT_KEY: process.env.WORKER_JWT_KEY as string,
    },
    body: JSON.stringify({ parts: uploadedParts }),
  });

  try {
    if (!res || res.status !== 200) {
      throw new Error("Unable to complete upload");
    }

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json({
      message: "Unable to generate uploadId",
    });
  }
}
