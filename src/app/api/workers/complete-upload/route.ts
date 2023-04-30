import { fetchPlus } from "@/lib/fetch";
import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function POST(req: Request) {
  const body = await req.json();
  const { fileId, uploadId, uploadedParts } = body;

  console.log(
    `fileId: ${fileId},
    uploadId: ${uploadId},
    uploadedParts: ${uploadedParts}`
  );

  const baseUrl = process.env.WORKER_URL as string;
  const url = new URL(baseUrl);

  const newJsonBody = JSON.stringify({ parts: uploadedParts });

  url.pathname = fileId;
  url.searchParams.set("action", "mpu-complete");
  url.searchParams.set("uploadId", uploadId);

  console.log(`
  body:${newJsonBody}
  url: ${url.toString()}`);

  const res = await fetchPlus(url, {
    method: "POST",
    headers: {
      JWT_KEY: process.env.WORKER_JWT_KEY as string,
    },
    body: newJsonBody,
  });
  console.log(res);

  try {
    if (!res) {
      throw new Error("Unable to complete upload");
    }

    if (res.status !== 200) {
      console.log("Res Status Text was bad");
      throw new Error(res.statusText);
    }

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Failed to upload file",
    });
  }
}
