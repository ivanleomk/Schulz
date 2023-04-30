import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function POST(req: Request) {
  const body = await req.json();
  const { fileId } = body;

  const baseUrl = process.env.WORKER_URL as string;
  const url = new URL(baseUrl);

  url.pathname = fileId;
  url.searchParams.set("action", "mpu-create");
  console.log(`fileId: ${fileId}`);
  console.log(`baseUrl: ${baseUrl.toString()}`);
  console.log(`url: ${url.toString()}`);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      jwt_key: process.env.WORKER_JWT_KEY as string,
    },
  });
  try {
    const resJson = await res.json();
    const uploadId = resJson["uploadId"];

    return NextResponse.json({
      uploadId,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Unable to generate uploadId",
    });
  }
}
