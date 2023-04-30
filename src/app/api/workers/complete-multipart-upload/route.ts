import { s3 } from "@/lib/s3";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { uploadId, key, parts } = await req.json();

  const res = await s3.completeMultipartUpload({
    Bucket: process.env.BUCKET as string,
    UploadId: uploadId,
    MultipartUpload: {
      Parts: parts,
    },
    Key: key,
  });

  if (res.$metadata?.httpStatusCode !== 200) {
    return NextResponse.error();
  }

  return NextResponse.json({
    message: "OK",
  });
}
