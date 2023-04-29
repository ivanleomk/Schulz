import { fetchPlus } from "@/lib/fetch";
import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export async function POST(req: Request) {
  const formData = await req.formData();
  const fileId = formData.get("fileId") as string;
  const uploadId = formData.get("uploadId") as string;
  const partNumber = formData.get("partNumber") as string;
  const file = formData.get("file") as File;

  const baseUrl = process.env.WORKER_URL as string;
  const url = new URL(baseUrl);

  url.pathname = fileId;
  url.searchParams.set("action", "mpu-uploadpart");
  url.searchParams.set("uploadId", uploadId);
  url.searchParams.set("partNumber", partNumber);

  const body = new FormData();
  formData.append("file", file);

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      JWT_KEY: process.env.WORKER_JWT_KEY as string,
    },
    body,
  });
  try {
    if (!res) {
      return NextResponse.error();
    }
    const body = await res.json();
    return NextResponse.json({
      ...body,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Unable to generate uploadId",
    });
  }
}
