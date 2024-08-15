// app/api/calculate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { llmWithTools } from "@/lib/llm";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    // Invoke the LLM with the user-provided query
    const result = await llmWithTools.invoke(query);

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
