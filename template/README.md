# CDN-Starter

A modern, production-ready starter template for building custom JavaScript/TypeScript code for Webflow projects. Streamline your development workflow with TypeScript, automated builds, and comprehensive code quality tools.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![PNPM](https://img.shields.io/badge/PNPM-10%2B-orange.svg)](https://pnpm.io/)

## Features

- **🔧 Modern TypeScript Setup** - Full TypeScript support with strict type checking
- **⚡ Lightning Fast Builds** - Powered by esbuild for instant compilation
- **📦 Optimized Production Builds** - Minified, tree-shaken, and ES2020-compatible output
- **📏 Code Quality** - ESLint, Prettier, and TypeScript integration
- **🎯 Path Aliases** - Clean imports with custom path mappings
- **📋 Changesets** - Automated versioning and changelog generation
- **🌐 Webflow Ready** - Optimized for Webflow custom code integration

## Quick Start

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (v10.0.0 or higher) - [Install guide](https://pnpm.io/installation)

### Installation

1. **Create a new repository from this template**

   [🔗 Use this template](https://github.com/Fynd-Design-Engineering/CDN-Starter)

   > **Note:** You must be authenticated with a Fynd Design Engineering GitHub account

2. **Clone and install dependencies**
   After creating a project with above template install all dependencies using pnpm

   ```bash
   pnpm install
   ```

3. **Start developing**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see your project in action!

## Development Workflow

### Development Mode

Launch the development server:

```bash
pnpm dev
```

**What happens:**

- 📦 Bundles TypeScript files in real-time
- 🌐 Serves files at `http://localhost:3000`
- 🗺️ Generates source maps for debugging
- 📊 Displays a helpful table of served files with import suggestions

### Production Build

Create an optimized build for deployment:

```bash
pnpm build
```

**Build optimizations:**

- 🗜️ Code minification and compression
- 🌳 Tree shaking to remove unused code
- 🎯 ES2020 target for broad browser compatibility
- 📁 Clean output in the `dist/` directory

## Code Quality

### Code Linting

Maintain code quality with ESLint:

```bash
# Check for issues
pnpm lint

# Auto-fix common problems
pnpm lint:fix
```

### Code Formatting

Keep code consistent with Prettier:

```bash
pnpm format
```

### Type Checking

Verify TypeScript types:

```bash
pnpm check
```

## Release Management

This project uses [Changesets](https://github.com/changesets/changesets) for professional version management.

### Creating a Release

1. **Work on your feature branch** (never commit directly to `main`)

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and build**

   ```bash
   pnpm build
   ```

3. **Create a changeset**

   ```bash
   pnpm changeset
   ```

   Follow the prompts to:

   - Select which packages changed
   - Choose the semantic version bump (patch/minor/major)
   - Write a clear summary of changes

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Publish the release**
   ```bash
   pnpm release
   ```

### Dependency Management

Keep dependencies up-to-date:

```bash
pnpm update
```

## Project Architecture

```
cdn-starter/
├── 📂 src/
│   ├── 📄 index.ts          # Main entry point
│   └── 📂 utils/            # Utility functions
│       └── 📄 *.ts          # Your utility modules
├── 📂 dist/                 # 🏗️ Build output (auto-generated)
├── 📂 bin/                  # 🔧 Build tools
│   └── 📄 build.js          # esbuild configuration
├── 📄 package.json          # Project configuration
├── 📄 tsconfig.json         # TypeScript settings
├── 📄 eslint.config.js      # ESLint rules
└── 📄 README.md            # This file
```

## Advanced Configuration

### Multiple Entry Points

Build multiple files by updating `bin/build.js`:

```javascript
const ENTRY_POINTS = [
  "src/home/index.ts", // → dist/home/index.js
  "src/contact/form.ts", // → dist/contact/form.js
  "src/shared/utils.ts", // → dist/shared/utils.js
];
```

### Path Aliases

Use clean imports with pre-configured aliases:

```typescript
// ❌ Avoid relative paths
import { helper } from "../../utils/helper";

// ✅ Use clean path aliases
import { helper } from "$utils/helper";
```

**Available aliases:**

- `$utils/*` → `src/utils/*`

Add more in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "$utils/*": ["src/utils/*"],
      "$components/*": ["src/components/*"],
      "$types/*": ["src/types/*"]
    }
  }
}
```

## Webflow Integration

### Development Integration

For testing in Webflow during development:

1. Start the dev server: `pnpm dev`
2. Use the development URLs in Webflow:
   ```html
   <script defer src="http://localhost:3000/index.js"></script>
   ```

### Production Deployment

1. **Build your project**

   ```bash
   pnpm build
   ```

2. **Upload to your CDN**
   Upload files from the `dist/` directory to your preferred CDN (Cloudflare, AWS CloudFront, etc.)

3. **Include in Webflow**
   Run this to get the generated cdn links with the latest version available
   ```bash
   pnpm cdn
   ```

### Best Practices for Webflow

- **Use `defer`** for non-critical scripts
- **Minimize HTTP requests** by bundling related functionality
- **Test thoroughly** across different Webflow templates
- **Use semantic versioning** for cache busting

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** following our code standards
4. **Run quality checks**
   ```bash
   pnpm lint && pnpm check
   ```
5. **Add a changeset**
   ```bash
   pnpm changeset
   ```
6. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Push and create a Pull Request**

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions or changes
- `chore:` Maintenance tasks

## Performance Tips

- **Bundle analysis**: Use esbuild's metafile option for bundle analysis
- **Code splitting**: Consider splitting large applications into multiple entry points
- **Tree shaking**: Write ES modules to enable automatic dead code elimination
- **Compression**: Enable gzip/brotli compression on your CDN

## Troubleshooting

### Common Issues

**Build failures:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**TypeScript errors:**

```bash
# Check your tsconfig.json configuration
pnpm check
```

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

<div align="center">
  <sub>Built with ❤️ by Raimon at Fynd</sub>
</div>
