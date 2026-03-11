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

export function toAbsolutePath(path: string) {
  if (!path.startsWith(".")) throw new Error("Use relative path based on the current directory !");
  return resolve(process.cwd(), path);
}

export class IntroTask {
  private static async _getConfig() {
    const configPath = resolve(process.cwd(), "./index.config.js");
    await access(configPath);
    const config = (await import(configPath).then((m) => m.default)) as TIndexerConfig;
    return config;
  }

  static async execute() {
    const config = await IntroTask._getConfig();
    return { config };
  }
}

export class MainTask {
  private static async _getFileContent(path: string) {
    await access(path);
    return readFile(path, { encoding: "utf-8" });
  }
  private static _glob(pattern: string, ignore: string[] = []) {
    return _glob(pattern, { ignore, onlyFiles: true, dot: true });
  }
  private static async _asyncMapProcessInput(
    inputItem:
      | TIndexerConfig["input"]["files"][number]
      | TIndexerConfig["input"]["folders"][number],
  ) {
    const srcPath = toAbsolutePath(inputItem.path) + "/";
    const ignore = "ignore" in inputItem ? inputItem.ignore : [];
    const pattern = "ignore" in inputItem ? srcPath + "/**/*" : srcPath;

    const allPathFiles = await MainTask._glob(pattern, ignore);
    const contentsEntries = await Promise.all(
      allPathFiles.map(async (path) => [
        toAbsolutePath("./" + path),
        await MainTask._getFileContent(path),
      ]),
    );

    return {
      name: inputItem.name,
      files: contentsEntries.map(([path, source]) => ({
        path: "ignore" in inputItem ? path.replace(srcPath, "") : (path.split("/").pop() as string),
        source,
      })),
    };
  }

  static execute(config: TIndexerConfig) {
    return Promise.all([
      ...config.input.folders.map(MainTask._asyncMapProcessInput),
      ...config.input.files.map(MainTask._asyncMapProcessInput),
    ]);
  }
}

export class OutroTask {
  private static async _accessAndDeleteOrCreateOutputFolder(path: string) {
    try {
      await access(path);
      await rm(path, { recursive: true });
      console.info("Regenerate folder");
    } catch {}

    await mkdir(path);
    console.info("Folder created");
  }
  private static async _asyncWriteFile(path: string, content: any) {
    await writeFile(path, JSON.stringify(content, undefined, 2));
  }
  private static _sanitizeFilename(filename: string) {
    return filename.replaceAll(/[^\w]/gm, "-").toLocaleLowerCase();
  }

  static async execute(
    output: string = DEFAULT_OUTPUT_FOLDER,
    indexes: Awaited<ReturnType<typeof MainTask.execute>>,
  ) {
    const outputPath = toAbsolutePath(output);
    await OutroTask._accessAndDeleteOrCreateOutputFolder(outputPath);

    const fileNamesEntries = await Promise.all(
      indexes.map(async ({ files, name }) => {
        const filename = OutroTask._sanitizeFilename(name) + ".json";
        await OutroTask._asyncWriteFile(join(outputPath, filename), files);
        return [name, filename];
      }),
    );

    await OutroTask._asyncWriteFile(
      join(outputPath, "index.json"),
      Object.fromEntries(fileNamesEntries),
    );
  }
}

export async function executeIndexer() {
  const { config } = await IntroTask.execute();
  const indexes = await MainTask.execute(config);
  await OutroTask.execute(config.output?.path, indexes);
  console.info("Index finished");
}
