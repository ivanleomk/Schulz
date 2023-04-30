import { s3 } from "@/lib/s3";
import { S3, UploadPartCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();

  const file = form.get("file") as File;
  const uploadId = form.get("uploadId") as string;
  const partNumber = form.get("partNumber") as string;
  const key = form.get("key") as string;

  if (!file || typeof file === "string") {
    return NextResponse.error();
  }

  const input = {
    Body: await file.arrayBuffer(),
    Bucket: process.env.BUCKET as string,
    Key: key,
    PartNumber: parseInt(partNumber),
    UploadId: uploadId,
  };

  //@ts-ignore : Works fine
  const comand = new UploadPartCommand(input);
  const response = await s3.send(comand);

  const parsedResponse = {
    ETag: response.ETag,
    PartNumber: partNumber,
  };

  return NextResponse.json({
    ...parsedResponse,
  });
}
