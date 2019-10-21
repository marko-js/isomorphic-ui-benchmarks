process.env.NODE_ENV = "production";

const path = require("path");
const exec = require("child_process").execSync;
const gitUrl = "git@github.com:marko-js/isomorphic-ui-benchmarks.git";
const gitBranch = "gh-pages";

const buildDir = path.join(__dirname, "../build");
const publishDir = path.join(__dirname, "../__publish");

process.chdir(path.join(__dirname, ".."));

exec("markoc . --clean");
exec(`rm -rf ${path.join(__dirname, "../.cache")}`);
exec(`rm -rf ${publishDir}`);
exec(`rm -rf ${buildDir}`);

console.log("Building bundles...");
exec("npm run build");
console.log("Done.");

console.log("Building static site...");
exec('URL_PREFIX="/isomorphic-ui-benchmarks" npm run static');
console.log("Done.");

// create publish directory
exec(`mkdir ${publishDir}`);

// clone the repo that is the publish target
exec(
  `cd ${publishDir} && git init && git remote add origin ${gitUrl} && git fetch`
);

// switch to the target branch
try {
  exec(`cd ${publishDir} && git checkout -t origin/${gitBranch}`);
} catch (e) {
  exec(`cd ${publishDir} && git checkout -b ${gitBranch}`);
}

// steal the .git directory
exec(`rm -rf ${buildDir}/.git`);

exec(`mv ${publishDir + "/.git"} ${buildDir}`);
exec(`rm -rf ${publishDir}`);

// commit and push up the changes
try {
  exec(
    `cd ${buildDir} && git add . --all && git commit -m "updated static site"`
  );
  exec(`cd ${buildDir} && git push origin ${gitBranch}`);
  console.log(
    "Static site successfully built and pushed to remote repository."
  );
} catch (e) {
  if (e.cmd && e.cmd.indexOf("git commit")) {
    console.log("Static site successfully built. No changes to push.");
  }
}
