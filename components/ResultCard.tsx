import { capitaliseFirstLetter } from "@/lib/utils"
import { Switch } from "./ui/switch";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface SummaryObject {
    [key: string]: string;
}

interface Props {
    summary: SummaryObject[];
}

const summary = [
    {
        "date": "April 24th, 2023",
        "prospect": "John Smith, Sarah Johnson",
        "company": "Debit Goose",
        "summary": "SP gave a sales pitch highlighting the benefits of their product and how it could help Debit Goose achieve their business goals. JS and SJ then discussed Debit Goose's current needs and challenges, particularly in the area of customer acquisition. SP suggested several ways in which their product could help Debit Goose overcome these challenges. JS and SJ requested a demo of the product, which SP agreed to provide at a later date.",
        "actions": "SP to schedule a demo of the product, Debit Goose to provide SP with more information on their current systems and processes"
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ResultCard({ summary }: Props) {

    const [viewMode, setViewMode] = useState<"Markdown" | "Beautified">(
        "Beautified"
    );
    const [showEditForm, setShowEditForm] = useState(false);
    const editFormRef = useRef<HTMLDivElement>(null);

    const handleViewModeToggle = () => {
        if (viewMode === "Markdown") {
            setViewMode("Beautified");
        } else {
            setViewMode("Markdown");
        }
    };

    const onEditClick = () => {
        setShowEditForm(true);
        // scroll to edit form
        editFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <div ref={editFormRef}>
                {showEditForm
                    ? <>EDIT FORM GOES HERE</>
                    : <></>
                }
            </div>
            <div className="flow-root">
                <ul role="list" className="-mb-8">
                    {summary.map((event, eventIdx) => (
                        <li key={eventIdx}>
                            <div className="relative pb-8">
                                {eventIdx !== summary.length - 1 ? (
                                    <span className="absolute left-1 top-1 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                ) : null}
                                <div className="relative flex space-x-3">
                                    <div className="flex align-middle">
                                        <span
                                            className=
                                            'relative top-1.5 bg-blue-500 h-2 w-2 rounded-full flex items-center justify-center ring-2 ring-white'
                                        />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <span className="ml-2 text-gray-500 mb-2 text-sm">Generated Summary</span>
                                        <div className="ml-2 col-span-3 rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5" key={eventIdx}>
                                            {viewMode == "Markdown"
                                                ? (
                                                    <div className="p-3">
                                                        <Textarea
                                                            value={JSON.stringify(event, null, 2)}
                                                            contentEditable={false}
                                                            placeholder="Write down your meeting notes"
                                                            className="w-full min-h-[200px] flex-1 p-5 md:min-h-[300px] lg:min-h-[400px]"
                                                        />
                                                    </div>
                                                )
                                                : (<dl className="flex flex-wrap">
                                                    <div className="flex-auto py-1 px-3">
                                                        {Object.entries(event).map(([key, value]) => {
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
                                                        onEditClick()
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
                    ))}
                </ul>
            </div>
        </>
    )
}
