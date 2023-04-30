import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ClipLoader } from "react-spinners";
import { createChunks, generateFileName } from "@/lib/file";
import { toast } from "./ui/use-toast";
import { fetchPlus } from "@/lib/fetch";

const AudioFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const handleUpload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!file) {
      toast({
        title: "Error Encountered",
        description: "Please upload a valid file",
      });
      return;
    }
    setUploadingFile(true);
    try {
      const fileName = generateFileName(file);
      const chunks = createChunks(file, 1024 * 1024 * 5);

      const uploadIdUrl = `/workers?action=create-multipart-upload&key=${fileName}`;

      const res = await fetch(uploadIdUrl, {
        method: "POST",
        headers: {
          "X-Custom-Auth-Key":
            "W7PafdzZg67Wku7AHJsRgwOhg19aCyq44uezwB/mifEonsmrTprl3i9bFRBWWwumVCrghBrP1n1niHDRGhKAc7kkCPbD9s06kNluLfDf8RE9tmHVKwkwjlE1k0yNxFCDatrBEkKqjytQSyAXiTT39Ls/clz096UX1t7dSOks7qkzvLIaQR0504YjsVpczldHWt2JtciGdZtntS90HXXpNOZPOCM2ylHd5RFrLohDfFsjwT7LAtZpVS1jpbI8mfJwf/bwVFjL1KCJzP6ZxjPai3TuKdryop3DdUAjxDixu7UbHdvUnb7fXql90nI4GXZdBj9tsac91dSCqUJTQNxPjQ==",
        },
      });

      const uploadId = await res.json();
      console.log(uploadId);

      // const uploadId = res["uploadId"] as string;

      // if (!uploadId) {
      //   throw new Error("Upload id not found");
      // }

      // const uploadPromises = chunks.map((item, idx) => {
      //   const formData = new FormData();
      //   formData.append("file", item);
      //   formData.append("uploadId", uploadId);
      //   formData.append("partNumber", (idx + 1).toString());
      //   formData.append("key", fileName);
      //   return fetchPlus("/api/workers/upload-part-s3", {
      //     method: "POST",
      //     body: formData,
      //   });
      // });

      // const promises = await Promise.all(uploadPromises);

      // console.log("Succesfully uploaded parts");
      // console.log(promises);

      // const completeUploadRes = await fetchPlus(
      //   "/api/workers/complete-multipart-upload",
      //   {
      //     method: "POST",
      //     body: JSON.stringify({
      //       uploadId,
      //       key: fileName,
      //       parts: promises,
      //     }),
      //   }
      // );

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });

      // const uploadIdBody = await fetch("/api/workers/get-upload-id", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     fileId,
      //   }),
      // });

      // const uploadIdRes = await uploadIdBody.json();
      // const uploadId = uploadIdRes["uploadId"];

      // const chunks = createChunks(file, 1024 * 1024 * 5);

      // console.log(chunks);

      // console.log(`Total chunks: ${chunks.length}`);

      // const uploadPromises = chunks.map((item, idx) => {
      //   const form = new FormData();
      //   form.append("file", item);
      //   form.append("fileId", fileId);
      //   form.append("uploadId", uploadId);
      //   form.append("partNumber", (idx + 1).toString());

      //   return fetch("/api/workers/upload-part", {
      //     method: "POST",
      //     body: form,
      //   }).then((res) => {
      //     return res.json();
      //   });
      // });

      // const uploadedParts = await Promise.all(uploadPromises);

      // console.log("Succesfully uploaded all parts");

      // const completeUploadBody = await fetch("/api/workers/complete-upload", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     fileId,
      //     uploadId,
      //     uploadedParts,
      //   }),
      // });

      // const completeUploadRes = await completeUploadBody.json();

      // console.log(completeUploadRes);

      // if (completeUploadRes["status"]) {
      //   toast({
      //     title: "Success",
      //     description: "File uploaded successfully",
      //   });
      // }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error Encountered",
        description: "Unable to upload file. Please try again later",
      });
    } finally {
      setUploadingFile(false);
    }
  };
  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
        <Label htmlFor="Audio Transcript">Audio Transcript</Label>
        <Input
          id="Audio Transcript"
          type="file"
          accept=".mp3,.mp4"
          onChange={(e) => {
            const files = e?.target?.files;
            if (files && files.length > 0) {
              setFile(files[0]);
            }
          }}
        />
        <p className="text-xs text-gray-400">
          Upload an audio transcript and we&apos;ll transcribe it all
        </p>
        <Button
          className="py-1 px-2 w-full"
          onClick={(e) => {
            handleUpload(e);
          }}
          variant="outline"
          disabled={uploadingFile}
        >
          {uploadingFile ? (
            <ClipLoader size={20} speedMultiplier={0.4} />
          ) : (
            "Upload Audio"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AudioFileUpload;
