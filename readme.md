# CDN-Starter

A modern, production-ready starter for building and deploying JavaScript/TypeScript projects to Webflow or any CDN.  
Powered by **TypeScript**, **esbuild**, and **Changesets**, it offers a fast and reliable workflow for custom scripts.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![PNPM](https://img.shields.io/badge/PNPM-10%2B-orange.svg)](https://pnpm.io/)

---

## Quick Start

### Prerequisites

Make sure you have:

- **Node.js** `v18+` → [Download](https://nodejs.org/)
- **pnpm** `v10+` → [Install guide](https://pnpm.io/installation)
- (Optional) **npm** for project setup

---

### 1. Create a New Project

Create a new CDN-Starter project using npm:

```bash
npm create cdn-starter@latest my-project
```

This will generate a new folder with all required configurations and project structure.

---

### 2. Install Dependencies

Inside your project folder, install dependencies:

```bash
pnpm install
```

---

### 3. Update `package.json`

After installation, open your **`package.json`** and update the following fields with your project’s details:

```json
{
  "name": "name-of-your-project",
  "version": "0.0.0",
  "description": "description-of-your-project",
  "homepage": "homepage-of-your-project",
  "license": "license-of-your-project",
  "keywords": [],
  "author": {
    "name": "author-of-your-project",
    "url": "url-of-your-project"
  }
}
```

Only edit these fields.  
Leave everything else as is — those settings handle builds, scripts, and publishing.

---

### 4. Configure Entry Points

Before you start development, define your build entry points inside **`bin/build.js`**:

```js
// Config entrypoint files
const ENTRY_POINTS = [
  "src/index.ts",
  "src/styles/global.css",
  "src/sample/test.ts",
];
```

Every file you want compiled must be listed in `ENTRY_POINTS`.

For example, if you create a new file called `src/home/index.ts`,  
you must add it like this:

```js
const ENTRY_POINTS = [
  "src/home/index.ts",
];
```

When you build, it will automatically be compiled to:

```
dist/home/index.js
```

This ensures your folder structure is mirrored cleanly from `src` → `dist`.

---

### 5. Start Development

Run the development build:

```bash
pnpm dev
```

This will:
- Watch and rebuild TypeScript/CSS files in real time  
- Serve them locally at [http://localhost:3000](http://localhost:3000)  
- Display a table of available files with helpful import suggestions  

---

## Building for Production

When ready to deploy:

```bash
pnpm build
```

This will:
- Minify and tree-shake your code  
- Target modern ES2020 output  
- Generate final builds inside the `/dist` directory  

---

## Versioning and Releasing

Version and publish your code using **Changesets**.

### 1. Create a Changeset

```bash
pnpm changeset
```

Follow the prompts to describe your update and select a version bump (patch, minor, or major).

### 2. Update Versions

```bash
pnpm changeset version
```

Applies the new version to your package and updates changelogs.

### 3. Log In to npm

```bash
npm login
npm whoami
```

### 4. Release Your Package

```bash
pnpm release
```

Publishes your package to npm.  
Ensure your commits and builds are up-to-date before releasing.

---

## CDN and Webflow Integration

After your package has been released, generate CDN links using:

```bash
pnpm cdn
```

This will print ready-to-use `<script>` or `<link>` tags referencing your latest version.

Example:

```html
<script defer src="https://cdn.jsdelivr.net/npm/your-package-name@latest/dist/index.js"></script>
```

Run `pnpm cdn` only after `pnpm release`, so you always get links for the newest published version.

---

## Project Structure

```
cdn-starter/
├── src/                 # Source files — these are the files you edit
│   ├── index.ts
│   ├── styles/
│   │   └── global.css
│   ├── sample/
│   │   └── test.ts
│   └── home/
│       └── index.ts     # Example: will build to dist/home/index.js
├── bin/
│   └── build.js         # Configure entry points here
├── dist/                # Auto-generated build output (do not edit)
├── package.json
├── tsconfig.json
├── eslint.config.js
└── README.md
```

All editable files live in `src/`.  
Every file you add must be mentioned in `bin/build.js` to be compiled into `dist/`.

---

## Code Quality

Keep your project clean and consistent:

```bash
pnpm lint        # Check code for issues
pnpm lint:fix    # Auto-fix problems
pnpm format      # Format code using Prettier
pnpm check       # Run TypeScript type checks
```

---

## Best Practices

- Always add new files to `bin/build.js` before running `pnpm dev` or `pnpm build`  
- Keep your editable code inside `src/` only  
- Update only allowed fields in `package.json`  
- Use semantic versioning (`major.minor.patch`)  
- Commit all changes before release  
- Test your published npm package locally before using in Webflow  

---

## Troubleshooting

**Build errors:**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Type errors:**
```bash
pnpm check
```

**npm login issues:**
```bash
npm login
npm whoami
```

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

Built by rtstic.
