# Contributing to Scripture Linker

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Marvive/scripture-linker.git
   cd scripture-linker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development mode**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## Project Structure

```
scripture-linker/
├── src/
│   ├── main.ts           # Plugin entry point
│   ├── types.ts          # TypeScript types and translation config
│   ├── bibleBooks.ts     # Book data and lookup functions
│   ├── referenceParser.ts # Reference detection and parsing
│   ├── urlGenerators.ts  # URL generation for Logos/Bolls
│   └── settings.ts       # Settings UI
├── tests/                # Jest test files
└── manifest.json         # Obsidian plugin manifest
```

## Code Style

- Use **4-space indentation**
- Use **TypeScript** for all source files
- Write **JSDoc comments** for public functions
- Follow existing patterns in the codebase

## Pull Request Process

1. **Fork the repository** and create your branch from `main`
2. **Add tests** for any new functionality
3. **Ensure all tests pass** (`npm test`)
4. **Build successfully** (`npm run build`)
5. **Update documentation** if needed
6. **Submit your PR** with a clear description

## Reporting Issues

When reporting bugs, please include:

- Obsidian version
- Plugin version
- Steps to reproduce
- Expected vs actual behavior
- Example text that causes the issue

## Feature Requests

Feature requests are welcome! Please:

1. Check existing [issues](https://github.com/Marvive/scripture-linker/issues) first
2. Describe the use case clearly
3. Explain how it would improve the plugin

## Questions?

Feel free to open an issue for any questions or concerns.
