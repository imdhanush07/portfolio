/**
 * The admin API writes files on disk, so it only runs on your own computer
 * (npm run dev) and only accepts requests coming from localhost.
 */
export function adminGuard(request: Request): Response | null {
  if (process.env.NODE_ENV !== "development") {
    return Response.json(
      { error: "Editing is only available when running `npm run dev` locally." },
      { status: 403 }
    );
  }
  const host = (request.headers.get("host") ?? "").split(":")[0];
  const local = host === "localhost" || host === "127.0.0.1";
  const origin = request.headers.get("origin");
  const originOk = !origin || new URL(origin).host === request.headers.get("host");
  if (!local || !originOk) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}
