import { writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { adminGuard } from "@/lib/adminGuard";
import { validateContent } from "@/lib/validateContent";

export async function POST(request: Request) {
  const blocked = adminGuard(request);
  if (blocked) return blocked;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const errors = validateContent(body);
  if (errors.length) return Response.json({ error: errors.join(" ") }, { status: 422 });

  const target = path.join(process.cwd(), "data", "content.json");
  const temp = `${target}.tmp`;
  await writeFile(temp, JSON.stringify(body, null, 2) + "\n", "utf8");
  await rename(temp, target); // atomic swap so a crash never leaves a half-written file
  return Response.json({ ok: true });
}
