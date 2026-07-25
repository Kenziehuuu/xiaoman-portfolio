import { readFileSync } from "node:fs";
import { join } from "node:path";

const instructions = readFileSync(
  join(process.cwd(), "knowledge", "assistant-instructions.md"),
  "utf8"
);
const knowledge = readFileSync(
  join(process.cwd(), "knowledge", "knowledge-base.json"),
  "utf8"
);

const windows = new Map();
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;

function clientAddress(request) {
  return (
    request.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    request.socket?.remoteAddress ||
    "unknown"
  );
}

function isRateLimited(address) {
  const now = Date.now();
  const current = windows.get(address);

  if (!current || now - current.startedAt > WINDOW_MS) {
    windows.set(address, { startedAt: now, count: 1 });
    return false;
  }

  current.count += 1;
  return current.count > MAX_REQUESTS_PER_WINDOW;
}

function extractText(response) {
  if (response.output_text) return response.output_text;

  return (response.output || [])
    .flatMap((item) => item.content || [])
    .filter((item) => item.type === "output_text")
    .map((item) => item.text)
    .join("\n")
    .trim();
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  if (!process.env.OPENAI_API_KEY) {
    return response.status(503).json({
      error: "The AI assistant is not configured yet."
    });
  }

  const address = clientAddress(request);
  if (isRateLimited(address)) {
    return response.status(429).json({
      error: "Too many questions. Please wait a minute and try again."
    });
  }

  const question =
    typeof request.body?.question === "string"
      ? request.body.question.trim()
      : "";

  if (!question || question.length > 500) {
    return response.status(400).json({
      error: "Please enter a question between 1 and 500 characters."
    });
  }

  try {
    const openAIResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        instructions: `${instructions}\n\nPUBLIC KNOWLEDGE BASE:\n${knowledge}`,
        input: question,
        max_output_tokens: 400,
        text: { verbosity: "low" }
      })
    });

    const result = await openAIResponse.json();

    if (!openAIResponse.ok) {
      console.error("OpenAI request failed", {
        status: openAIResponse.status,
        code: result?.error?.code
      });
      return response.status(502).json({
        error: "I couldn't answer right now. Please try again shortly."
      });
    }

    const answer = extractText(result);
    if (!answer) {
      return response.status(502).json({
        error: "I couldn't form an answer. Please try another question."
      });
    }

    response.setHeader("Cache-Control", "no-store");
    return response.status(200).json({ answer });
  } catch (error) {
    console.error("AI assistant error", error);
    return response.status(500).json({
      error: "I couldn't answer right now. Please try again shortly."
    });
  }
}
