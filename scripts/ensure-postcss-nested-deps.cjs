/**
 * Next.js vende PostCSS in node_modules/next/node_modules/postcss senza
 * sempre installarvi picocolors e source-map-js. Turbopack allora fallisce
 * con "Can't resolve 'picocolors'". Questo script completa le dipendenze
 * locali di quel PostCSS dopo ogni npm install.
 */
const { existsSync } = require("fs");
const { execSync } = require("child_process");
const path = require("path");

const postcssDir = path.join(__dirname, "..", "node_modules", "next", "node_modules", "postcss");
const pkg = path.join(postcssDir, "package.json");

if (!existsSync(pkg)) {
  process.exit(0);
}

console.log("[postinstall] Completing nested PostCSS deps for Next.js (picocolors, source-map-js)…");

try {
  execSync("npm install --omit=dev --no-audit --no-fund --loglevel=error", {
    cwd: postcssDir,
    stdio: "inherit",
  });
} catch {
  console.warn("[postinstall] Nested PostCSS install skipped or failed (safe to ignore on partial installs).");
}
