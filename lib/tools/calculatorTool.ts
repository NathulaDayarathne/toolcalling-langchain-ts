// lib/tools/calculatorTool.ts
import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";

// Define the schema for the calculator tool
export const calculatorSchema = z.object({
  operation: z
    .enum(["add", "subtract", "multiply", "divide"])
    .describe("The type of operation to execute."),
  number1: z.number().describe("The first number to operate on."),
  number2: z.number().describe("The second number to operate on."),
});

// Create the calculator tool using the schema
export const calculatorTool = new DynamicStructuredTool({
  name: "calculator",
  description: "Can perform mathematical operations.",
  schema: calculatorSchema,
  func: async ({ operation, number1, number2 }: z.infer<typeof calculatorSchema>) => {
    switch (operation) {
      case "add":
        return `${number1 + number2}`;
      case "subtract":
        return `${number1 - number2}`;
      case "multiply":
        return `${number1 * number2}`;
      case "divide":
        return `${number1 / number2}`;
      default:
        throw new Error("Invalid operation.");
    }
  },
});
