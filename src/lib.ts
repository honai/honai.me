import path from "node:path";
import { fileURLToPath } from "node:url";

export const dirName = (metaUrl: string) =>
  path.dirname(fileURLToPath(metaUrl));
