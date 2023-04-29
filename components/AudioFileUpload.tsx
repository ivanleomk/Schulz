import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ClipLoader } from "react-spinners";

const AudioFileUpload = () => {
  const [File, setFile] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const handleUpload = () => {};
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
