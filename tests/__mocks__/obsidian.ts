// Mock for obsidian module in tests
export class Plugin { }
export class PluginSettingTab { }
export class Setting {
    setName() { return this; }
    setDesc() { return this; }
    addDropdown() { return this; }
    addToggle() { return this; }
    clear() { return this; }
}
export class Notice {
    constructor(_message: string) { }
}
export class MarkdownView { }
export type Editor = any;
export type App = any;
