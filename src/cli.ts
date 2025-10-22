import path from "node:path";
import fs from "fs-extra";
import kleur from "kleur";

// In CJS builds, __dirname always exists. If something odd happens, fall back to cwd.
const dirname = typeof __dirname !== "undefined" ? __dirname : process.cwd();

const TEMPLATE_DIR = path.resolve(dirname, "../template");

function printBanner() {
  const banner = `
██████╗ ████████╗███████╗████████╗██╗ ██████╗
██╔══██╗╚══██╔══╝██╔════╝╚══██╔══╝██║██╔════╝
██████╔╝   ██║   ███████╗   ██║   ██║██║     
██╔══██╗   ██║   ╚════██║   ██║   ██║██║     
██║  ██║   ██║   ███████║   ██║   ██║╚██████╗
╚═╝  ╚═╝   ╚═╝   ╚══════╝   ╚═╝   ╚═╝ ╚═════╝`;
  console.log(banner);
  console.log(kleur.gray("────────────────────────────────"));
  console.log(kleur.cyan("Happy coding <3"));
  console.log(kleur.gray("HMU -> ") + kleur.blue("https://rtstic.dev/\n"));
}

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

  console.log(`\n${kleur.green("CDN Starter created successfully at ./")}${kleur.green(path.relative(process.cwd(), targetDir))}`);
  console.log(kleur.gray("────────────────────────────────"));
  console.log("Next:");
  console.log(`  cd ${target}`);
  console.log("  pnpm install   # or npm/yarn");
  console.log("  pnpm dev       # to start the development server");
  console.log("  pnpm build     # to build the project");
  console.log(kleur.gray("Read more: ") + kleur.blue("https://github.com/rtstic/create-cdn-starter/readme.md"));
  console.log(kleur.gray("────────────────────────────────"));
  printBanner();
  console.log(kleur.gray("────────────────────────────────"));

}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
