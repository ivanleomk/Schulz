import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ClipLoader } from "react-spinners";
import { createChunks, generateFileName } from "@/lib/file";
import { toast } from "./ui/use-toast";

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
      const fileId = generateFileName(file);
      const uploadIdBody = await fetch("/api/workers/get-upload-id", {
        method: "POST",
        body: JSON.stringify({
          fileId,
        }),
      });

      const uploadIdRes = await uploadIdBody.json();
      const uploadId = uploadIdRes["uploadId"];

      const chunks = createChunks(file, 1024 * 1024 * 4, 0);

      const uploadPromises = chunks.map((item, idx) => {
        const form = new FormData();
        form.append("file", item);
        form.append("fileId", fileId);
        form.append("uploadId", uploadId);
        form.append("partNumber", (idx + 1).toString());

        return fetch("/api/workers/upload-part", {
          method: "POST",
          body: form,
        }).then((res) => {
          return res.json();
        });
      });

      const uploadedParts = await Promise.all(uploadPromises);

      console.log("---Finished uploading All parts---");

      const completeUploadBody = await fetch("/api/workers/complete-upload", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          uploadId,
          uploadedParts,
        }),
      });

      const completeUploadRes = await completeUploadBody.json();

      console.log(completeUploadRes);

      if (completeUploadRes["status"]) {
        toast({
          title: "Success",
          description: "File uploaded successfully",
        });
      }
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
