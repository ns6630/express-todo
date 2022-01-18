import { execSync } from "child_process";

function run() {
  try {
    execSync(`npm run subtest`);
  } catch (e) {
    console.error(`Tests was failed.`);
  } finally {
    execSync(`npm run docker:down`);
  }
}

run();
