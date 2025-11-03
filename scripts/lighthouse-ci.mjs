import { execSync } from "node:child_process";

const url = process.env.LH_URL || "http://localhost:3000";
console.log("Lighthouse check:", url);

try {
  execSync(`npx lighthouse ${url} --quiet --only-categories=performance,accessibility --chrome-flags="--headless" --output=json --output-path=./.cache/lhr.json`, { stdio: "inherit" });
  console.log("Lighthouse done");
} catch (e) {
  process.exit(1);
}
