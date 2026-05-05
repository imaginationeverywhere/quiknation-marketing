export const runtime = 'edge';

import {
  BedrockRuntimeClient,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { auth } from "@clerk/nextjs/server";
import { AGENT_PROMPTS } from "@/lib/agent-prompts";
import { AGENT_DISPLAY_NAMES } from "@/lib/agents";
import { routeToAgent } from "@/lib/clara-router";

const BEDROCK_MODEL_ID = process.env.BEDROCK_MODEL_ID ?? "";

const bedrock = new BedrockRuntimeClient({
  region: process.env.AWS_REGION ?? "us-east-1",
});

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
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
    return Response.json(
      { error: "projectSlug is required" },
      { status: 400 },
    );
  }

  const resolvedAgent =
    typeof agentId === "string" && AGENT_PROMPTS[agentId]
      ? agentId
      : routeToAgent(message);

  const systemPrompt = AGENT_PROMPTS[resolvedAgent] ?? AGENT_PROMPTS.don;
  const projectContext = `You are helping with the ${projectSlug} project on the Quik Nation Marketing Hub.`;

  const response = await bedrock.send(
    new ConverseCommand({
      modelId: BEDROCK_MODEL_ID,
      system: [{ text: `${systemPrompt}\n\nContext: ${projectContext}` }],
      messages: [{ role: "user", content: [{ text: message }] }],
      inferenceConfig: { maxTokens: 300 },
    }),
  );

  const text = (response.output?.message?.content ?? [])
    .filter((b) => b.text !== undefined)
    .map((b) => b.text!)
    .join("\n");

  return Response.json({
    agent: resolvedAgent,
    agentName: AGENT_DISPLAY_NAMES[resolvedAgent] ?? resolvedAgent,
    response: text,
  });
}
