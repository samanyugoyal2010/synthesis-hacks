import { listTasksBySession } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId") ?? "default";
  const tasks = listTasksBySession(sessionId);
  return Response.json({ tasks });
}
