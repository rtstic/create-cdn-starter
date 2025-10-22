import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";


// Works when bundled to CJS or run as ESM
const dirname =
  // @ts-ignore __dirname exists at runtime in CJS, not in ESM
  typeof __dirname !== "undefined"
    // @ts-ignore
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const TEMPLATE_DIR = path.resolve(dirname, "../template");

async function main() {
  const arg = process.argv[2];
  const target = arg ? String(arg) : "my-cdn-app";
  const targetDir = path.resolve(process.cwd(), target);

  // sanity checks
  if (!(await fs.pathExists(TEMPLATE_DIR))) {
    console.error("Template folder is missing. Expected at:", TEMPLATE_DIR);
    process.exit(1);
  }
  await fs.ensureDir(targetDir);

  // copy template, skip node_modules and dist
  await fs.copy(TEMPLATE_DIR, targetDir, {
    overwrite: true,
    filter: src => {
      const base = path.basename(src);
      return base !== "node_modules" && base !== "dist";
    }
  });

  // rewrite package.json name and reset version
  const pkgPath = path.join(targetDir, "package.json");
  if (await fs.pathExists(pkgPath)) {
    const pkg = JSON.parse(await fs.readFile(pkgPath, "utf8"));
    pkg.name = path.basename(targetDir);
    pkg.version = "0.0.0";
    delete pkg.repository;
    delete pkg.bugs;
    delete pkg.homepage;
    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  }

  console.log(`\nScaffold created at ./${path.relative(process.cwd(), targetDir)}`);
  console.log("Next:");
  console.log(`  cd ${target}`);
  console.log("  pnpm install   # or npm/yarn");
  console.log("  pnpm dev       # if your template has a dev script");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
