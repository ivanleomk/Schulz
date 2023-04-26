"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { HoverCard, HoverCardTrigger } from "./ui/hovercard";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MeetingNotes = () => {
  const [viewMode, setViewMode] = useState<"Markdown" | "Beautified">(
    "Markdown"
  );
  const [notes, setNotes] = useState("");
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [summaryInfo, setSummaryInfo] = useState<Record<string, string> | null>(
    null
  );

  const [existingCustomers, setExistingCustomers] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/db/get-all-customers")
      .then(async (res) => {
        return res.body;
      })
      .then((body) => {
        const reader = body?.getReader();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        console.log(body, summary);
        setSummaryInfo(summary);
      })

      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setGeneratingSummary(false);
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
          Step 1 : Generate a summary
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
