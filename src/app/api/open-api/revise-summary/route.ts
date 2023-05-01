import { model } from "@/lib/llm"
import { NextResponse } from "next/server"
import { PromptTemplate } from "langchain/prompts"
import { StructuredOutputParser } from "langchain/output_parsers"

export async function POST(request: Request) {
  console.log("---Re-generating Summary")
  const { notes, previousResponse, reprompt } = await request.json()

  console.log(notes, previousResponse, reprompt)
  const parser = StructuredOutputParser.fromNamesAndDescriptions({
    date: "date of conversation",
    prospect: "comma separated list of name(s) of prospect(s)",
    company: "name(s) of company or organisation that prospect(s) work for",
    summary:
      "efficiently summarised conversation, detailed, specific, non-verbose",
    actions:
      "comma separated list of efficiently summarised actionables, non-verbose",
  })

  const formatInstructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template: `Extract the required information accurately, matching the specified field names and descriptions. Only use explicitly stated information and return '' if any information cannot be found.\n
    Format Instructions:
    {format_instructions}\n
    Meeting Notes:
    {summary}\n
    Please revise your previous response: {previous_response} using the following instructions: {reprompt}
    `,
    inputVariables: ["summary", "previous_response", "reprompt"],
    partialVariables: { format_instructions: formatInstructions },
  })

  const input = await prompt.format({
    summary: notes,
    reprompt: reprompt,
    previous_response: JSON.stringify(previousResponse),
  })
  const response = await model.call(input)
  const summary = await parser.parse(response)

  return NextResponse.json(summary)
}
