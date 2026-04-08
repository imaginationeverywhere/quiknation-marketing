import { auth } from "@clerk/nextjs/server";

/**
 * Brief persistence is client-side (localStorage) in v0.1.
 * These routes are reserved for Phase 2 server persistence.
 */
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json(
    { message: "Briefs are stored client-side in v0.1. Use Paperclip in the workspace." },
    { status: 501 },
  );
}

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json({ message: "Not implemented — use localStorage in v0.1" }, { status: 501 });
}
