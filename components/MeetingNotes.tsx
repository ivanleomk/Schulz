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
import { createChunks, generateTranscriptFromChunkPromise } from "@/lib/file";

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

    const formData = new FormData();
    formData.append("file", file);

    fetch("/api/fastapi/get-transcript", {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const response = await res.json();
        console.log(response);
        setNotes(response["message"]);
      })
      .catch((err) => {
        toast({
          title: "Error Encountered",
          description: "Unable to generate transcript. Please try again later.",
        });
      })
      .finally(() => {
        setGeneratingTranscript(false);
      });
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
