import { S3 } from "@aws-sdk/client-s3";

export const s3 = new S3({
  endpoint: `https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: `${process.env.R2_ACCESS_KEY_ID as string}`,
    secretAccessKey: `${process.env.R2_SECRET_ACCESS_KEY as string}`,
  },
  region: "apac",
});
