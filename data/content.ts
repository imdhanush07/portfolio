import raw from "./content.json";
import type { SiteContent } from "@/types";

/**
 * Everything editable on the site lives in data/content.json.
 * You normally never edit this file - use /admin (npm run dev) or edit the JSON directly.
 */
export const content = raw as unknown as SiteContent;
