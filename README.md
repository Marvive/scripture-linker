# Scripture Linker

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/Marvive/scripture-linker?style=for-the-badge&sort=semver)
![License](https://img.shields.io/github/license/Marvive/scripture-linker?style=for-the-badge)

**Scripture Linker** is an Obsidian plugin that automatically scans your notes for Bible references and converts them into clickable links to **Logos Bible Software** and **Bolls Bible**.

## Features

- **Automatic reference detection**: Finds Bible references like `John 3:16`, `Gen. 1:1-3`, or `1 Cor 13`
- **Contextual parsing**: Understands shorthand references like `(10:7)` after mentioning a book
- **Multiple translations**: ESV, NASB95, NIV 2011, MSG, LSB, LEB, KJV 1900, NKJV
- **Dual service support**: Link to Logos, Bolls Bible, or both
- **Smart link detection**: Won't re-link references already in markdown links
- **Robust abbreviation support**: Recognizes 500+ book name variations

## Installation

1. Copy these files to `.obsidian/plugins/scripture-linker/`:
   - `main.js`
   - `manifest.json`
   - `styles.css`

2. Enable the plugin in **Settings → Community Plugins**

## Usage

### Commands

| Command | Description |
|---------|-------------|
| **Scan file for Bible references** | Links all references in the current file |
| **Scan selection for Bible references** | Links only selected text |

### Ribbon Icon

Click the 📖 book icon in the left ribbon for quick file scanning.

### Settings

- **Default Translation**: Choose your preferred Bible translation
- **Link Service**: Select Logos, Bolls Bible, or both

## URL Formats

| Service | Example URL |
|---------|-------------|
| Logos (standard) | `https://ref.ly/logosres/esv?ref=BibleESV.Jn3.16` |
| Logos (KJV 1900) | `https://ref.ly/Ge1;kjv1900` |
| Bolls Bible | `https://bolls.life/ESV/43/3/#16` |

## Supported Translations

| Translation | Logos | Bolls |
|-------------|:-----:|:-----:|
| ESV | ✅ | ✅ |
| NASB95 | ✅ | ✅ |
| NIV 2011 | ✅ | ✅ |
| KJV 1900 | ✅ | ✅ |
| NKJV | ✅ | ✅ |
| MSG | ✅ | ✅ |
| LSB | ✅ | ✅ |
| LEB | ✅ | ❌ |

## Development

```bash
# Install dependencies
npm install

# Development build (watch mode)
npm run dev

# Production build
npm run build

# Run tests
npm test
```

## 🖤 Support & Feedback

**Scripture Linker** is a volunteer-led, open-source project. If it has improved your study workflow, please consider supporting its ongoing development:

- 🌟 **Star the Repository** – Help others find this tool by giving us a star.
- ☕ **Sponsor Maintenance** – Support the time and effort required to keep this plugin updated.
- 💬 **Join the Conversation** – Report bugs or suggest new features in the [Issue Tracker](https://github.com/Marvive/scripture-linker/issues).

<p align="left">
  <a href="https://github.com/sponsors/Marvive">
    <img src="https://img.shields.io/badge/Sponsor_on_GitHub-ea4aaa?style=for-the-badge&logo=github-sponsors&logoColor=white" alt="Sponsor on GitHub" />
  </a>
  &nbsp;
  <a href="https://github.com/Marvive/scripture-linker/stargazers">
    <img src="https://img.shields.io/badge/Star_this_Repo-ffcc00?style=for-the-badge&logo=github&logoColor=white" alt="Star this Repo" />
  </a>
</p>

## License

[MIT](LICENSE) © Michael Marvive
