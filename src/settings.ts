import { App, PluginSettingTab, Setting } from 'obsidian';
import { Translation, LinkService, TRANSLATION_CONFIG, IScriptureLinkerPlugin } from './types';

export class ScriptureLinkerSettingTab extends PluginSettingTab {
    plugin: IScriptureLinkerPlugin;

    constructor(app: App, plugin: IScriptureLinkerPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: 'Scripture Linker Settings' });

        // Information section (moved above settings)
        containerEl.createEl('h3', { text: 'About' });
        containerEl.createEl('p', {
            text: 'Scripture Linker scans your notes for Bible references and converts them into clickable links for Logos and Bolls Bible.',
            cls: 'setting-item-description'
        });

        containerEl.createEl('p', {
            text: 'You can use the ribbon icon or the following commands to scan your notes:',
            cls: 'setting-item-description',
            attr: { style: 'margin-bottom: 5px;' }
        });

        const listEl = containerEl.createEl('ul', { cls: 'setting-item-description', attr: { style: 'margin-top: 0;' } });
        listEl.createEl('li', { text: 'Scan file for Bible references' });
        listEl.createEl('li', { text: 'Scan selection for Bible references' });

        containerEl.createEl('br');

        // Ribbon icon toggle
        new Setting(containerEl)
            .setName('Show ribbon icon')
            .setDesc('Toggle the ribbon icon on or off')
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.showRibbonIcon)
                    .onChange(async (value) => {
                        this.plugin.settings.showRibbonIcon = value;
                        await this.plugin.saveSettings();
                        this.plugin.refreshRibbonIcon();
                    });
            });

        // Translation dropdown
        const translationSetting = new Setting(containerEl)
            .setName('Default translation')
            .setDesc('Select the default Bible translation for generated links');

        this.updateTranslationDropdown(translationSetting);

        // Link service selection
        new Setting(containerEl)
            .setName('Link service')
            .setDesc('Choose which Bible service to link to')
            .addDropdown(dropdown => {
                dropdown
                    .addOption('logos', 'Logos Bible Software (ref.ly)')
                    .addOption('bolls', 'Bolls Bible')
                    .addOption('both', 'Both (shows two links)')
                    .setValue(this.plugin.settings.linkService)
                    .onChange(async (value) => {
                        this.plugin.settings.linkService = value as LinkService;

                        // If switching to Bolls and current translation isn't supported, 
                        // reset to a supported one (ESV)
                        const currentTrans = this.plugin.settings.defaultTranslation as Translation;
                        const isBolls = value === 'bolls' || value === 'both';
                        if (isBolls && !TRANSLATION_CONFIG[currentTrans].supportsBolls) {
                            this.plugin.settings.defaultTranslation = 'ESV';
                        }

                        await this.plugin.saveSettings();

                        // Re-render the whole tab to update the translation dropdown options
                        this.display();
                    });
            });
    }

    private updateTranslationDropdown(setting: Setting): void {
        const isBolls = this.plugin.settings.linkService === 'bolls' || this.plugin.settings.linkService === 'both';

        setting.clear();
        setting.addDropdown(dropdown => {
            const translations: Array<{ id: Translation, name: string }> = [
                { id: 'ESV', name: 'ESV (English Standard Version)' },
                { id: 'NASB95', name: 'NASB95 (New American Standard 1995)' },
                { id: 'NIV', name: 'NIV (New International Version 2011)' },
                { id: 'KJV', name: 'KJV (King James Version)' },
                { id: 'NKJV', name: 'NKJV (New King James Version)' },
                { id: 'MSG', name: 'MSG (The Message)' },
                { id: 'LSB', name: 'LSB (Legacy Standard Bible)' },
                { id: 'LEB', name: 'LEB (Lexham English Bible)' },
            ];

            for (const trans of translations) {
                // Filter out translations not supported by Bolls if Bolls is selected
                if (isBolls && !TRANSLATION_CONFIG[trans.id].supportsBolls) {
                    continue;
                }
                dropdown.addOption(trans.id, trans.name);
            }

            dropdown
                .setValue(this.plugin.settings.defaultTranslation)
                .onChange(async (value) => {
                    this.plugin.settings.defaultTranslation = value as Translation;
                    await this.plugin.saveSettings();
                });
        });
    }
}
