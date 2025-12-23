import { build } from "vite";
import buildConfig from "./vite.config";
import { cp, readFile } from "node:fs/promises";
import { join } from "node:path";
import manifest from "./manifest.json" assert { type: "json" };

const manifestFile = join(process.cwd(), "manifest.json");

await build();

const config = buildConfig;
const outDir = join(process.cwd(), config?.build?.outDir || "dist");

const manifestFileTarget = join(outDir, "manifest.json");
await cp(manifestFile, manifestFileTarget, { force: true });

const targetDir = join(
  process.cwd(),
  "vault-test/.obsidian/plugins/",
  manifest.id
);
await cp(outDir, targetDir, { recursive: true, force: true });
