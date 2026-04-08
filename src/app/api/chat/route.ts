import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@clerk/nextjs/server";
import { AGENT_PROMPTS } from "@/lib/agent-prompts";
import { AGENT_DISPLAY_NAMES } from "@/lib/agents";
import { routeToAgent } from "@/lib/hermes-router";

function extractAssistantText(content: Anthropic.Message["content"]): string {
  if (!Array.isArray(content)) return "";
  return content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n");
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY is not configured" },
      { status: 503 },
    );
  }

  let body: { message?: string; projectSlug?: string; agentId?: string };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { message, projectSlug, agentId } = body;
  if (!message || typeof message !== "string" || !message.trim()) {
    return Response.json({ error: "message is required" }, { status: 400 });
  }
  if (!projectSlug || typeof projectSlug !== "string") {
    return Response.json({ error: "projectSlug is required" }, { status: 400 });
  }

  const resolvedAgent =
    typeof agentId === "string" && AGENT_PROMPTS[agentId]
      ? agentId
      : routeToAgent(message);

  const systemPrompt = AGENT_PROMPTS[resolvedAgent] ?? AGENT_PROMPTS.don;
  const projectContext = `You are helping with the ${projectSlug} project on the Quik Nation Marketing Hub.`;

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 300,
    system: `${systemPrompt}\n\nContext: ${projectContext}`,
    messages: [{ role: "user", content: message }],
  });

  const text = extractAssistantText(msg.content);

  return Response.json({
    agent: resolvedAgent,
    agentName: AGENT_DISPLAY_NAMES[resolvedAgent] ?? resolvedAgent,
    response: text,
  });
}
