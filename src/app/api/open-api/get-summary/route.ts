import { model } from "@/lib/llm";
import { NextResponse } from "next/server";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";

export async function POST(request: Request) {
  console.log("---Generating Summary");
  const { notes } = await request.json();

  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    date: "date of conversation",
    prospect: "comma separated list of name(s) of prospect(s)",
    company: "name(s) of company or organisation that prospect(s) work for",
    summary:
      "efficiently summarised conversation, detailed, specific, non-verbose",
    actions:
      "comma separated list of efficiently summarised actionables, non-verbose",
  });

  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Please extract the required information accurately and match the specified field names and descriptions. Only use information explicitly stated and return '' if information cannot be found.\n{format_instructions}\nHere are the meeting notes:\n{summary}",
    inputVariables: ["summary"],
    partialVariables: { format_instructions: formatInstructions },
  });

  const input = await prompt.format({ summary: notes });
  const response = await model.call(input);
  const summary = await parser.parse(response);

  return NextResponse.json(summary);
}
