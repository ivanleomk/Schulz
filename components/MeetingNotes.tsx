"use client";
import React, { useMemo, useState } from "react";
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
import { useClerk } from "@clerk/nextjs";
import { capitaliseFirstLetter } from "@/lib/utils";
import ResultCard from "./ResultCard";

interface SummaryObject {
  [key: string]: string;
}

const MeetingNotes = () => {
  const testSummary = {
    date: "April 24th, 2023",
    prospect: "John Smith, Sarah Johnson",
    company: "Debit Goose",
    summary:
      "SP gave a sales pitch highlighting the benefits of their product and how it could help Debit Goose achieve their business goals. JS and SJ then discussed Debit Goose's current needs and challenges, particularly in the area of customer acquisition. SP suggested several ways in which their product could help Debit Goose overcome these challenges. JS and SJ requested a demo of the product, which SP agreed to provide at a later date.",
    actions:
      "SP to schedule a demo of the product, Debit Goose to provide SP with more information on their current systems and processes",
  };

  const { user } = useClerk();
  const [viewMode, setViewMode] = useState<"Markdown" | "Beautified">(
    "Markdown"
  );
  const [notes, setNotes] = useState("");
  const [rePrompt, setRePrompt] = useState("");
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [summaryInfo, setSummaryInfo] = useState<SummaryObject[]>([
    testSummary,
    testSummary,
    testSummary,
  ]);
  const [file, setFile] = React.useState<File | null>(null);
  const [generatingTranscript, setGeneratingTranscript] = useState(false);
  const userId = useMemo(() => user?.id, [user]);

  const handleViewModeToggle = (e: boolean) => {
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
        console.log(body);

        setSummaryInfo([...summaryInfo, body]);
        setGeneratingSummary(false);
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
        {summaryInfo && summaryInfo.length != 0 && (
          <div>
            {/* <div className="flex-1 py-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-tight">Result</h2>
              </div>
            </div> */}
            <ResultCard summary={summaryInfo} />
            {/* {summaryInfo.map((summary, index) => {
              return (
                <div className="col-span-3 rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5" key={index}>
                  <dl className="flex flex-wrap">
                    <div className="flex-auto py-6 px-6">
                      {Object.entries(summary).map(([key, value]) => {
                        return (
                          <div key={key} className="flex-auto py-2">
                            <dt className="text-sm font-semibold leading-6 text-gray-900">{capitaliseFirstLetter(key)}:</dt>
                            <dd className="mt-1 text-xs font-semibold leading-6 text-gray-900">{value}</dd>
                          </div>
                        )
                      })}
                    </div>
                  </dl>
                </div>
              );
            })} */}
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
        {/* {file ? (
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
        )} */}

        <Button
          onClick={(e) => generateSummary(e)}
          disabled={generatingSummary}
        >
          {!generatingSummary ? "Generate Summary" : "loading..."}
        </Button>
        {summaryInfo && summaryInfo.length != 0 && (
          <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
            <Label htmlFor="necessary" className="flex flex-col space-y-1">
              Step 2 : Verify
            </Label>
            <Textarea
              value={rePrompt}
              onChange={(e) => {
                setRePrompt(e.target.value);
              }}
              placeholder="Write feedback here"
              className="min-h-[20px] flex-1 p-4 md:min-h-[20px] lg:min-h-[20px]"
            />
            <div className="flex flex-row gap-2">
              <Button className="w-1/2 bg-violet-500 hover:bg-violet-600">
                Accept
              </Button>
              <Button className="w-1/2">Reprompt</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingNotes;
