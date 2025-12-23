import { ItemView, WorkspaceLeaf } from "obsidian";

// Import the Counter Svelte component and the `mount` and `unmount` methods.
import App from "./app.svelte";
import { mount, unmount } from "svelte";

export const VIEW_TYPE_EXAMPLE = "example-view";

export class ExampleView extends ItemView {
  view: ReturnType<typeof App> | undefined;

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_EXAMPLE;
  }

  getDisplayText() {
    return "Example view";
  }

  async onOpen() {
    this.view = mount(App, {
      target: this.contentEl,
      props: {},
    });
  }

  async onClose() {
    if (this.view) unmount(this.view);
  }
}
