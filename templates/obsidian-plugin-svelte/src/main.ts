import { MarkdownView, Plugin, WorkspaceLeaf } from "obsidian";
import { DEFAULT_SETTINGS, MyPluginSettings } from "./settings";
import { ExampleView, VIEW_TYPE_EXAMPLE } from "./view";

export default class MyPlugin extends Plugin {
  settings!: MyPluginSettings;

  async onload() {
    await this.loadSettings();

    this.registerView(VIEW_TYPE_EXAMPLE, (leaf) => new ExampleView(leaf));

    this.addRibbonIcon("dice", "Activate view", () => {
      this.activateView();
    });
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      (await this.loadData()) as Partial<MyPluginSettings>
    );
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async activateView() {
    const { workspace } = this.app;

    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE);

    if (leaves.length > 0) leaf = leaves[0];
    else {
      leaf = workspace.getActiveViewOfType(MarkdownView);
      if (leaf === null) leaf = workspace.getLeaf(true);
      await leaf.setViewState({ type: VIEW_TYPE_EXAMPLE, active: true });
    }
    workspace.revealLeaf(leaf);
  }
}
