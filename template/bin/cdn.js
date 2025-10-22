import { readdirSync } from "fs";
import { join, sep, extname } from "path";
import { readFileSync } from "fs";

// Config
const BUILD_DIRECTORY = "dist";
const PACKAGE_NAME = "@fynd-design-engineering/cdn-starter";

/**
 * Gets package version from package.json
 * @returns {string} The package version
 */
function getPackageVersion() {
  try {
    const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
    return packageJson.version;
  } catch (error) {
    console.error("Error reading package.json:", error.message);
    process.exit(1);
  }
}

/**
 * Recursively gets all files in a directory.
 * @param {string} dirPath
 * @returns {string[]} An array of file paths.
 */
function getFiles(dirPath) {
  try {
    const files = readdirSync(dirPath, { withFileTypes: true }).map(
      (dirent) => {
        const path = join(dirPath, dirent.name);
        return dirent.isDirectory() ? getFiles(path) : path;
      }
    );
    return files.flat();
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error.message);
    return [];
  }
}

/**
 * Normalizes file path to CDN format
 * @param {string} filePath
 * @param {string} version
 * @returns {string} CDN URL
 */
function createCdnUrl(filePath, version) {
  // Remove dist directory from path and normalize separators
  const relativePath = filePath
    .replace(BUILD_DIRECTORY + sep, "")
    .replace(/\\/g, "/");
  return `https://cdn.jsdelivr.net/npm/${PACKAGE_NAME}@${version}/dist/${relativePath}`;
}

/**
 * Creates appropriate HTML tag for file type
 * @param {string} cdnUrl
 * @param {string} fileName
 * @returns {string} HTML tag
 */
function createHtmlTag(cdnUrl, fileName) {
  const ext = extname(fileName).toLowerCase();

  switch (ext) {
    case ".css":
      return `<link href="${cdnUrl}" rel="stylesheet" type="text/css" />`;
    case ".js":
      return `<script defer src="${cdnUrl}"></script>`;
    default:
      return `<!-- ${cdnUrl} -->`;
  }
}

/**
 * Main function to generate CDN links
 */
function generateCdnLinks() {
  const version = getPackageVersion();

  console.log(`\n🚀 Generating CDN links for ${PACKAGE_NAME}@${version}\n`);

  // Check if dist directory exists
  try {
    const files = getFiles(BUILD_DIRECTORY);

    if (files.length === 0) {
      console.log(
        "⚠️  No files found in dist directory. Run `pnpm build` first.\n"
      );
      return;
    }

    const htmlTags = files
      .filter(
        (file) => !file.endsWith(".map") && !file.endsWith(".tsbuildinfo")
      ) // Exclude source maps and tsbuildinfo
      .map((file) => {
        const cdnUrl = createCdnUrl(file, version);
        const fileName = file.split(sep).pop();
        return createHtmlTag(cdnUrl, fileName);
      });

    // Display just the HTML tags for easy copying
    console.log("📋 Copy-paste ready HTML tags:\n");
    htmlTags.forEach((tag) => {
      console.log(tag);
    });

    console.log("\n✨ CDN links generated successfully!\n");
  } catch (error) {
    console.error("❌ Error generating CDN links:", error.message);
    process.exit(1);
  }
}

// Run the script
generateCdnLinks();
