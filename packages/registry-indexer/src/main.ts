import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { glob as _glob } from "tinyglobby";

const DEFAULT_OUTPUT_FOLDER = "./.index-registry";

type TIndexerConfig = {
  input: {
    folders: { path: string; ignore?: string[]; name: string }[];
    files: { name: string; path: string }[];
  };
  output?: {
    path?: string;
  };
};

export function defineConfig(config: TIndexerConfig) {
  return config;
}

//#region Intro
async function getConfig() {
  const configPath = resolve(process.cwd(), "./index.config.js");
  await access(configPath);
  const config = (await import(configPath).then((m) => m.default)) as TIndexerConfig;
  return config;
}
async function intro() {
  const config = await getConfig();
  return { config };
}
//#endregion

//#region Task
async function getFileContent(path: string) {
  await access(path);
  return readFile(path, { encoding: "utf-8" });
}
function toAbsolutePath(path: string) {
  if (!path.startsWith(".")) throw new Error("Use relative path based on the current directory !");
  return resolve(process.cwd(), path);
}
function glob(pattern: string, ignore: string[] = []) {
  return _glob(pattern, { ignore, onlyFiles: true, dot: true });
}
async function asyncMapProcessInput(
  inputItem: TIndexerConfig["input"]["files"][number] | TIndexerConfig["input"]["folders"][number],
) {
  const srcPath = toAbsolutePath(inputItem.path) + "/";
  const ignore = "ignore" in inputItem ? inputItem.ignore : [];
  const pattern = "ignore" in inputItem ? srcPath + "/**/*" : srcPath;

  const allPathFiles = await glob(pattern, ignore);
  const contentsEntries = await Promise.all(
    allPathFiles.map(async (path) => [toAbsolutePath("./" + path), await getFileContent(path)]),
  );

  return {
    name: inputItem.name,
    files: contentsEntries.map(([path, source]) => ({
      path: "ignore" in inputItem ? path.replace(srcPath, "") : (path.split("/").pop() as string),
      source,
    })),
  };
}
function processIndexesTask(config: TIndexerConfig) {
  return Promise.all([
    ...config.input.folders.map(asyncMapProcessInput),
    ...config.input.files.map(asyncMapProcessInput),
  ]);
}
//#endregion

//#region Outro
async function accessAndDeleteOrCreateOutputFolder(path: string) {
  try {
    await access(path);
    await rm(path, { recursive: true });
    console.info("Regenerate folder");
  } catch {}

  await mkdir(path);
  console.info("Folder created");
}
async function asyncWriteFile(path: string, content: any) {
  await writeFile(path, JSON.stringify(content, undefined, 2));
}
function sanitizeFilename(filename: string) {
  return filename.replaceAll(/[^\w]/gm, "-").toLocaleLowerCase();
}
async function outro(
  output: string = DEFAULT_OUTPUT_FOLDER,
  indexes: Awaited<ReturnType<typeof processIndexesTask>>,
) {
  const outputPath = toAbsolutePath(output);
  await accessAndDeleteOrCreateOutputFolder(outputPath);

  const fileNamesEntries = await Promise.all(
    indexes.map(async ({ files, name }) => {
      const filename = sanitizeFilename(name) + ".json";
      await asyncWriteFile(join(outputPath, filename), files);
      return [name, filename];
    }),
  );

  await asyncWriteFile(join(outputPath, "index.json"), Object.fromEntries(fileNamesEntries));
}
//#endregion

export async function main() {
  const { config } = await intro();
  const indexes = await processIndexesTask(config);
  await outro(config.output?.path, indexes);
  console.log("Index finished");
}
