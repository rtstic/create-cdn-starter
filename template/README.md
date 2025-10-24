# Your Project

> **Note:** This README is a starting point.  
> Update it with your project-specific details, file explanations, and logic descriptions to make it more informative and maintainable.

This project was generated using [**CDN-Starter**](https://www.npmjs.com/package/create-cdn-starter) — a modern template for building and deploying TypeScript/JavaScript code to Webflow or any CDN environment.  
You can now customize it with your own scripts, utilities, and design logic.

---

## Getting Started

### 1. Install Dependencies

Run the following command inside your project folder:

```bash
pnpm install
```

This will install all required development and build dependencies.

---

### 2. Update `package.json`

After installation, open the `package.json` file and fill in your own details:

```json
{
  "name": "your-project-name",
  "version": "0.0.0",
  "description": "brief description of your project",
  "homepage": "your-project-homepage",
  "license": "MIT",
  "keywords": [],
  "author": {
    "name": "your-name",
    "url": "your-website-or-profile"
  }
}
```

Only update the above fields.  
Other configurations are pre-optimized for TypeScript builds, linting, and npm releases.

---

### 3. Edit Source Files

All editable files are inside the `src/` folder.  
This is where you add your scripts, components, utilities, and styles.

Example workflow:

- Modify `src/index.ts` or create new folders like `src/home/` or `src/utils/`.
- Whenever you add a new file, include it in `bin/build.js` under `ENTRY_POINTS`.

```js
const ENTRY_POINTS = [
  "src/index.ts",
  "src/styles/global.css",
  "src/home/index.ts"
];
```

Any file listed here will be automatically compiled into the `dist/` folder when you build.

---

## Available Commands

### Development

Start a local development environment:

```bash
pnpm dev
```

This command compiles your code in real time and serves it at:
[http://localhost:3000](http://localhost:3000)

---

### Build for Production

Generate optimized and minified builds:

```bash
pnpm build
```

Output files are created inside the `dist/` directory.  
These are the files you can upload to your CDN or include in Webflow.

---

### Linting and Formatting

Maintain code consistency and quality:

```bash
pnpm lint        # Check for lint issues
pnpm lint:fix    # Auto-fix lint issues
pnpm format      # Format code using Prettier
pnpm check       # Type check using TypeScript
```

---

### Versioning and Releasing

Handle versioning and publishing to npm:

```bash
pnpm changeset
pnpm changeset version
pnpm release
```

Run these sequentially to version and release your package.

---

### Generate CDN Links

After publishing, run:

```bash
pnpm cdn
```

This displays ready-to-use `<script>` or `<link>` tags pointing to the latest version of your npm package.

Example:

```html
<script defer src="https://cdn.jsdelivr.net/npm/your-package-name@latest/dist/index.js"></script>
```

---

## Folder Structure

```
your-project/
├── src/             # All editable source files
│   ├── index.ts
│   ├── styles/
│   │   └── global.css
│   └── home/
│       └── index.ts
├── bin/             # Build configuration (edit ENTRY_POINTS here)
│   └── build.js
├── dist/            # Generated build output (do not edit)
├── package.json
├── tsconfig.json
├── eslint.config.js
└── README.md
```

**Important:**  
Every file you create inside `src/` must be listed in `bin/build.js` under `ENTRY_POINTS` to be compiled into `dist/`.

---

## Notes

- Keep editable files limited to the `src/` directory.
- Avoid manual edits in `dist/` — it’s auto-generated.
- Use **semantic versioning** (`major.minor.patch`) for clear release cycles.
- Always commit changes before running a release.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

Built using [**CDN-Starter**](https://www.npmjs.com/package/create-cdn-starter).
