// lib/llm.ts
import { ChatOpenAI } from "@langchain/openai";
import { calculatorTool } from "./tools/calculatorTool";

// Instantiate the model with your API key
const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo-0125",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY!,
});

// Bind the tool to the model
export const llmWithTools = llm.bindTools([calculatorTool]);
