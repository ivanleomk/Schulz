"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { ClipLoader } from "react-spinners";

const MeetingNotes = () => {
  const [viewMode, setViewMode] = useState<"Markdown" | "Beautified">(
    "Markdown"
  );
  const [notes, setNotes] = useState("");
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [summaryInfo, setSummaryInfo] = useState<Record<string, string> | null>(
    null
  );
  const [file, setFile] = React.useState<File | null>(null);
  const [generatingTranscript, setGeneratingTranscript] = useState(false);

  const generateTranscriptFromChunkPromise = async (file: File) => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("model", "whisper-1");
    formData.append("response_format", "verbose_json");

    const res = await fetch("/api/open-api/get-transcript", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });
    const response = await res.json();
    console.log(`${file.name} :  `, response);
    return response;
  };
  function getFileExtension(file) {
    const fileName = file.name;
    const extensionIndex = fileName.lastIndexOf(".");
    if (extensionIndex >= 0) {
      const extension = fileName.substring(extensionIndex + 1);
      return extension;
    } else {
      return "";
    }
  }

  const generateTranscript = async (e) => {
    setGeneratingTranscript(true);
    e.preventDefault();
    if (!file) {
      setGeneratingTranscript(false);
      toast({
        title: "Error Encountered",
        description: "Please upload a valid file",
      });
      return;
    }

    const chunkSize = 15 * 1024 * 1024; // 25 MB in bytes
    const overlapSize = 1 * 1024 * 1024; // 5 MB in bytes

    let offset = 0;
    const promises = [];
    while (offset < file.size) {
      const chunkEnd = Math.min(offset + chunkSize, file.size);
      const chunk = file.slice(offset, chunkEnd);
      const truncatedFile = new File(
        [chunk],
        `chunk_${offset}_${chunkEnd}.${getFileExtension(file)}`,
        { type: file.type }
      );
      console.log(truncatedFile.name);
      promises.push(generateTranscriptFromChunkPromise(truncatedFile));
      offset += chunkSize - overlapSize;
    }

    const res = await Promise.all(promises);
    setGeneratingTranscript(false);

    // while (offset < file.size) {
    //   let chunkEnd = offset + chunkSize;
    //   if (chunkEnd > file.size) {
    //     chunkEnd = file.size;
    //     const chunk = file.slice(offset, chunkEnd);
    //     const truncatedFile = new File(
    //       [chunk],
    //       "chunk_" + offset + "_" + chunkEnd,
    //       { type: file.type }
    //     );
    //     promises.push(generateTranscriptFromChunkPromise(truncatedFile));
    //     offset += chunkSize - overlapSize;
    //     console.log(offset);
    //   }
    // }

    // const res = await Promise.all(promises);
    // console.log(res);

    // let formData = new FormData();
    // formData.append("file", file);
    // formData.append("model", "whisper-1");
    // formData.append("response_format", "verbose_json");

    // console.log(formData);
    // console.log(formData.get("model"));
    // console.log(formData.get("response_format"));
    // console.log(formData.get("file"));

    // fetch("/api/open-api/get-transcript", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //   },
    //   body: formData,
    // })
    //   .then(async (res) => {
    //     console.log(res);
    //     const body = await res.json();
    //     setNotes(body["transcript"]);
    //     toast({
    //       title: "Success",
    //       description: "Transcript succesfully generated",
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast({
    //       title: "Error",
    //       description: "Unable to generate transcript - error encountered",
    //       variant: "destructive",
    //     });
    //   });
  };

  const handleViewModeToggle = (e) => {
    if (viewMode === "Markdown") {
      setViewMode("Beautified");
    } else {
      setViewMode("Markdown");
    }
  };

  const generateSummary = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setGeneratingSummary(true);
    fetch("/api/open-api/get-summary", {
      method: "POST",
      body: JSON.stringify({
        notes,
      }),
    })
      .then(async (res) => {
        const body = await res.json();
        const { summary } = body;

        setSummaryInfo(summary);
      })

      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setGeneratingTranscript(false);
      });
  };

  return (
    <div className="grid grid-cols-4 space-x-3">
      <div className="flex h-full flex-col space-y-4 col-span-3">
        {viewMode === "Markdown" ? (
          <Textarea
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
            placeholder="Write down your meeting notes"
            className="min-h-[200px] flex-1 p-4 md:min-h-[300px] lg:min-h-[400px]"
          />
        ) : (
          <div className="prose-sm list-disc">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{notes}</ReactMarkdown>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-4">
        <Label htmlFor="necessary" className="flex flex-col space-y-1">
          Input Mode
        </Label>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            <span>View Source</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Edit Raw Markdown
            </span>
          </Label>
          <Switch
            id="necessary"
            onCheckedChange={(e) => handleViewModeToggle(e)}
            value={viewMode}
          />
        </div>
        {file ? (
          <div className="mb-6">
            <Label htmlFor="Audio Transcript">Audio Transcript</Label>
            <p className="mt-1 mb-3 text-sm text-gray-500">{file.name}</p>
            <div className="flex items-center gap-x-2 ">
              <Button
                className="py-1 px-2 w-full"
                onClick={(e) => {
                  generateTranscript(e);
                }}
                variant="outline"
                disabled={generatingTranscript}
              >
                {generatingTranscript ? (
                  <ClipLoader size={20} speedMultiplier={0.4} />
                ) : (
                  "Generate Transcript"
                )}
              </Button>
              <Button
                className="py-1 px-2 w-full"
                onClick={(e) => {
                  setFile(null);
                }}
                variant="destructive"
                disabled={generatingTranscript}
              >
                Delete File
              </Button>
            </div>
          </div>
        ) : (
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
          </div>
        )}

        <Button
          onClick={(e) => generateSummary(e)}
          disabled={generatingSummary}
        >
          {!generatingSummary ? "Generate Summary" : "loading..."}
        </Button>
        {summaryInfo && (
          <div>
            <Label htmlFor="necessary" className="flex flex-col space-y-1">
              Step 2 : Verify
            </Label>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingNotes;
