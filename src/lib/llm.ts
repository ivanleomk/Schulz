import { OpenAI } from "langchain/llms/openai";

export const model = new OpenAI({
  temperature: 0,
  maxTokens: 1000,
});
