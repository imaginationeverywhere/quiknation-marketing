import { auth } from "@clerk/nextjs/server";

export async function PUT() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json({ message: "Not implemented — use localStorage in v0.1" }, { status: 501 });
}

export async function DELETE() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json({ message: "Not implemented — use localStorage in v0.1" }, { status: 501 });
}
