import { execSync } from 'node:child_process';


const msg = process.argv.slice(2).join(" ") || "bloch sphere patch";

execSync(`npx patch-package interactive-blochsphere && git add patches/interactive-blochsphere+0.2.0.patch && git commit -m "${msg}"`, { stdio: "inherit" });
