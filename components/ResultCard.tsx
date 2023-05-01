import { useState } from "react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { capitaliseFirstLetter } from "@/lib/utils";
import { SummaryObjectMap } from "./MeetingNotes";

export interface SummaryObject {
    [key: string]: string;
}

interface Props {
    summary: SummaryObjectMap;
    notLast: boolean;
    editFunction: (editState: SummaryObjectMap) => void;
}

export default function ResultCard({ summary, notLast, editFunction }: Props) {

    const [viewMode, setViewMode] = useState<"Markdown" | "Beautified">(
        "Beautified"
    );

    const handleViewModeToggle = () => {
        if (viewMode === "Markdown") {
            setViewMode("Beautified");
        } else {
            setViewMode("Markdown");
        }
    };

    const messageMap = {
        "Generated": "Generated Summary",
        "Edited": "Edited Summary",
        "Reprompted": "Regenerated Summary"
    }

    const colorFlagMap = {
        "Generated": "bg-blue-500",
        "Edited": "bg-violet-500",
        "Reprompted": "bg-blue-500"
    }

    return (
        <li>
            <div className="relative pb-8">
                {notLast ? (
                    <span className="absolute left-1 top-1 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                ) : null}
                <div className="relative flex space-x-3">
                    <div className="flex align-middle">
                        <span className={`relative top-1.5 h-2 w-2 rounded-full flex items-center justify-center ring-2 ring-white ${colorFlagMap[summary["typeFlag"]]}`} />
                    </div>
                    <div className="flex flex-col w-full">
                        <span className="ml-2 text-gray-500 mb-2 text-sm">{messageMap[summary["typeFlag"]]}</span>
                        <div className="ml-2 col-span-3 rounded-lg bg-gray-100 shadow-sm ring-1 ring-gray-900/5">
                            {viewMode == "Markdown"
                                ? (
                                    <div className="p-3">
                                        <Textarea
                                            value={JSON.stringify(summary["summaryObject"], null, 2)}
                                            contentEditable={false}
                                            placeholder="Write down your meeting notes"
                                            className="bg-white w-full min-h-[200px] flex-1 p-5 md:min-h-[300px] lg:min-h-[400px] text-xs"
                                        />
                                    </div>
                                )
                                : (<dl className="flex flex-wrap">
                                    <div className="flex-auto py-1 px-3">
                                        {Object.entries(summary["summaryObject"]).map(([key, value]) => {
                                            return (
                                                <div key={key} className="flex-auto py-2">
                                                    <dt className="text-sm font-semibold leading-6 text-gray-900">{capitaliseFirstLetter(key)}:</dt>
                                                    <dd className="mt-1 text-xs font-semibold leading-6 text-gray-900">{value}</dd>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </dl>)}
                            <div className="flex flex-auto py-2 px-3 h-fit justify-between">
                                <div className="flex flex-auto h-fit gap-1 my-auto">
                                    <span className="inline-block text-gray-500 align-middle my-auto text-sm">View JSON</span>
                                    <Switch
                                        id="necessary"
                                        onCheckedChange={() => handleViewModeToggle()}
                                        value={viewMode}
                                    />
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Button className="w-1/2" onClick={() => {
                                        editFunction(summary)
                                    }}>
                                        Edit
                                    </Button>
                                    <Button className="w-1/2 bg-violet-500 hover:bg-violet-600">
                                        Accept
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )

}