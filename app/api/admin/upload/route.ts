import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { adminGuard } from "@/lib/adminGuard";

const ALLOWED: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};
const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const blocked = adminGuard(request);
  if (blocked) return blocked;

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return Response.json({ error: "No file." }, { status: 400 });

  const ext = ALLOWED[file.type];
  if (!ext) return Response.json({ error: "Use a PNG, JPG or WebP image." }, { status: 415 });
  if (file.size > MAX_BYTES) return Response.json({ error: "Image must be under 5 MB." }, { status: 413 });

  const base = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "image";
  const name = `${base}-${Date.now().toString(36)}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return Response.json({ path: `/uploads/${name}` });
}
