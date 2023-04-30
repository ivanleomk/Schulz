import { s3 } from "@/lib/s3";
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { Key, Size } = await req.json();
  // Set to expire in an hour by default

  const params = {
    Bucket: process.env.BUCKET as string,
    Key,
  };

  const res = await s3.createMultipartUpload(params);
  const status = res?.$metadata?.httpStatusCode;

  if (!status || status !== 200) {
    console.log("Invalid Response");
    return NextResponse.error();
  }

  return NextResponse.json({
    uploadId: res.UploadId,
  });

  // [...Array(Size)].map(
  //   (item,i) => {
  //     return getSignedUrl(
  //         s3,
  //         {
  //           buck
  //         }
  //       )
  //   }
  //   )

  // const url = await getSignedUrl(
  //   s3,
  //   new PutObjectCommand({ Bucket: process.env.BUCKET, Key }),
  //   { expiresIn: 3600 }
  // );

  // const multipart = s3.createMultipartUpload();

  return NextResponse.json({
    url: "",
  });
}
