import { input, select } from "@inquirer/prompts";
import { access, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

type TConfig = {
  baseUrls: Record<string, string>;
};

class ConfigFunctions {
  private static _CONFIG_PATH = join(import.meta.dirname, "config.json");
  private static _config: TConfig | null;

  private static async _isConfigExsists() {
    try {
      await access(ConfigFunctions._CONFIG_PATH);
      return true;
    } catch {}
    return false;
  }

  static async getConfig() {
    if (!ConfigFunctions._isConfigExsists) await ConfigFunctions.promptSetConfig();

    const content = await readFile(ConfigFunctions._CONFIG_PATH, { encoding: "utf-8" });
    const config = JSON.parse(content) as TConfig;
    ConfigFunctions._config = config;

    return ConfigFunctions._config;
  }
  static async setConfig(config: TConfig) {
    // TODO: Validator
    ConfigFunctions._config = config;
    await writeFile(ConfigFunctions._CONFIG_PATH, JSON.stringify(ConfigFunctions._config), {
      encoding: "utf-8",
    });
    return ConfigFunctions._config;
  }

  static async _promptEditConfigBaseUrls(baseUrls: TConfig["baseUrls"]) {
    await select({ choices: [{ name: "Delete", type: "delete" }], message: "Choose config action !" });
  }

  static async promptSetConfig() {
    const config = await ConfigFunctions.getConfig();

    // TODO Validate url but now it on your own brooo not my machine
    const baseUrl = await input({
      message: `Enter project name${config ? `(current: ${config.baseUrl})` : ""}`,
      required: true,
    });

    await ConfigFunctions.setConfig({ baseUrl });
  }
}

class CoreFunctions {
  private static _fetchIndex(baseUrl: string) {
    return fetch(baseUrl + "/index.json").then(
      (r) => r.json() as Promise<{ name: string; path: string }[]>,
    );
  }

  private static _promtSelect(indexes: { name: string; path: string }[]) {
    console.log({ indexes });
  }

  static async execute() {
    const { baseUrl } = await ConfigFunctions.getConfig();

    const indexes = await CoreFunctions._fetchIndex(baseUrl);
    CoreFunctions._promtSelect(indexes);
  }
}
