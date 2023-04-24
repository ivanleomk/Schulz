import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { loadSummarizationChain } from "langchain/chains";
import { model } from "@/lib/llm";
import { NextResponse } from "next/server";
import { PromptTemplate } from "langchain/prompts";

export async function POST(request: Request) {
  console.log("---Generating Summary");
  const { notes } = await request.json();

  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([notes]);

  const template = `
  You are now going to be given a meeting note that summarizes a call between a sales person from our company and external prospects who work for another company.

  Text:
  {text}

  Please generate the following json.
  {{
      "date": "date of conversation","prospect":"name of prospect", "company":"company of prospect","summary":"summary"
  }}
  `;

  const promptTemplate = new PromptTemplate({
    template,
    inputVariables: ["text"],
  });
  const summarizationChain = loadSummarizationChain(model, {
    prompt: promptTemplate,
  });
  const summaryRes = await summarizationChain.call({
    input_documents: docs,
  });
  const summary = summaryRes["text"];
  console.log("---Generated Summary : ", summary);

  return NextResponse.json({ summary });
}
