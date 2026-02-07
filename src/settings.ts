import { App, PluginSettingTab, Setting, setIcon } from 'obsidian';
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

        // Information section (moved above settings)
        containerEl.createEl('p', {
            text: 'Scripture linker scans your notes for bible references and converts them into clickable links for logos and bolls bible.',
            cls: 'setting-item-description'
        });

        containerEl.createEl('p', {
            text: 'You can use the ribbon icon or the following commands to scan your notes:',
            cls: 'setting-item-description',
            attr: { style: 'margin-bottom: 5px;' }
        });

        const listEl = containerEl.createEl('ul', { cls: 'setting-item-description', attr: { style: 'margin-top: 0;' } });
        listEl.createEl('li', { text: 'Scan file for bible references' });
        listEl.createEl('li', { text: 'Scan selection for bible references' });

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
            .setDesc('Select the default bible translation for generated links');

        this.updateTranslationDropdown(translationSetting);

        // Link service selection
        new Setting(containerEl)
            .setName('Link service')
            .setDesc('Choose which bible service to link to')
            .addDropdown(dropdown => {
                dropdown
                    .addOption('logos', 'Logos bible software (ref.ly)')
                    .addOption('bolls', 'Bolls bible')
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

        containerEl.createEl('br');

        // Sponsor button
        const sponsorDiv = containerEl.createDiv();
        sponsorDiv.style.marginBottom = '10px';
        const sponsorBtn = sponsorDiv.createEl('button');
        sponsorBtn.style.display = 'flex';
        sponsorBtn.style.alignItems = 'center';
        sponsorBtn.style.gap = '5px';
        setIcon(sponsorBtn, 'heart');
        const heartIcon = sponsorBtn.querySelector('svg');
        if (heartIcon) heartIcon.style.color = '#db61a2';
        sponsorBtn.createSpan({ text: 'Sponsor' });
        sponsorBtn.onclick = () => window.open('https://github.com/sponsors/Marvive', '_blank');

        // Issues button
        const issuesDiv = containerEl.createDiv();
        const issuesBtn = issuesDiv.createEl('button', { text: 'Report issue or feature request' });
        issuesBtn.onclick = () => window.open('https://github.com/Marvive/scripture-linker/issues', '_blank');
    }

    private updateTranslationDropdown(setting: Setting): void {
        const isBolls = this.plugin.settings.linkService === 'bolls' || this.plugin.settings.linkService === 'both';

        setting.clear();
        setting.addDropdown(dropdown => {
            const translations: Array<{ id: Translation, name: string }> = [
                { id: 'ESV', name: 'ESV' },
                { id: 'NASB95', name: 'NASB95' },
                { id: 'NIV', name: 'NIV' },
                { id: 'KJV', name: 'KJV1900' },
                { id: 'NKJV', name: 'NKJV' },
                { id: 'MSG', name: 'MSG' },
                { id: 'LSB', name: 'LSB' },
                { id: 'LEB', name: 'LEB' },
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
