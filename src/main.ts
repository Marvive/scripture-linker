import { Editor, MarkdownView, Notice, Plugin } from 'obsidian';
import { ScriptureLinkerSettings, DEFAULT_SETTINGS } from './types';
import { ScriptureLinkerSettingTab } from './settings';
import { findAllReferences } from './referenceParser';
import { generateMarkdownLink, generateBothLinks } from './urlGenerators';

export default class ScriptureLinkerPlugin extends Plugin {
    settings: ScriptureLinkerSettings;
    private ribbonIconEl: HTMLElement | null = null;

    async onload() {
        await this.loadSettings();

        // Initialize ribbon icon based on settings
        this.refreshRibbonIcon();

        // Command: Scan entire file
        this.addCommand({
            id: 'scan-file',
            name: 'Scan file for Bible references',
            editorCallback: (editor: Editor) => {
                this.scanEditor(editor, false);
            },
        });

        // Command: Scan selected text only
        this.addCommand({
            id: 'scan-selection',
            name: 'Scan selection for Bible references',
            editorCallback: (editor: Editor) => {
                this.scanEditor(editor, true);
            },
        });

        // Add settings tab
        this.addSettingTab(new ScriptureLinkerSettingTab(this.app, this));
    }

    onunload() {
        // Cleanup if needed
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    /**
     * Refresh the ribbon icon visibility based on settings
     */
    refreshRibbonIcon() {
        if (this.settings.showRibbonIcon) {
            if (!this.ribbonIconEl) {
                this.ribbonIconEl = this.addRibbonIcon('book-open', 'Scan file for Bible references', () => {
                    this.scanActiveFile();
                });
            }
        } else {
            if (this.ribbonIconEl) {
                this.ribbonIconEl.remove();
                this.ribbonIconEl = null;
            }
        }
    }

    /**
     * Scan the active file from ribbon icon click
     */
    private scanActiveFile() {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (view) {
            this.scanEditor(view.editor, false);
        } else {
            new Notice('No active markdown file');
        }
    }

    /**
     * Scan editor content for Bible references and replace them with links
     * @param editor The editor instance
     * @param selectionOnly Whether to scan only the selection
     */
    private scanEditor(editor: Editor, selectionOnly: boolean) {
        let text: string;
        let startOffset = 0;

        if (selectionOnly) {
            text = editor.getSelection();
            if (!text) {
                new Notice('No text selected');
                return;
            }
            const from = editor.getCursor('from');
            startOffset = editor.posToOffset(from);
        } else {
            text = editor.getValue();
        }

        const references = findAllReferences(text);

        if (references.length === 0) {
            new Notice('No Bible references found');
            return;
        }

        // Process references in reverse order to maintain correct positions
        const sortedRefs = [...references].sort((a, b) => b.startIndex - a.startIndex);

        let processedText = text;
        let replacementCount = 0;

        for (const ref of sortedRefs) {
            let replacement: string;

            if (this.settings.linkService === 'both') {
                replacement = generateBothLinks(ref, this.settings.defaultTranslation);
            } else {
                replacement = generateMarkdownLink(
                    ref,
                    this.settings.defaultTranslation,
                    this.settings.linkService
                );
            }

            // Only replace if we got a valid link
            if (replacement !== ref.rawText) {
                processedText =
                    processedText.substring(0, ref.startIndex) +
                    replacement +
                    processedText.substring(ref.endIndex);
                replacementCount++;
            }
        }

        // Apply the changes
        if (selectionOnly) {
            editor.replaceSelection(processedText);
        } else {
            // Replace entire document while preserving cursor
            const cursor = editor.getCursor();
            editor.setValue(processedText);
            editor.setCursor(cursor);
        }

        new Notice(`Linked ${replacementCount} Bible reference${replacementCount === 1 ? '' : 's'}`);
    }
}
