import { getAllStrings } from "./lib";
import glob from "glob";

const files = glob.sync("/mnt/d/work/repos/toolbox8/src/**/*.js");
// const files = glob.sync("d:/work/repos/toolbox8/src/**/*.js");

const skipPatterns = [
  "locale",
  "example",
  "/toolbox8/src/custom/",
  "BigNumber",
  "xpath",
  "configScheme",
];

const skipRegex = new RegExp(skipPatterns.join("|"));
let skippedFiles = [];
files.forEach((file) => {
  if (skipRegex.test(file)) {
    skippedFiles.push(file);
  } else {
    const strings = getAllStrings(file);
    const output = strings
      .map((string) => {
        return `\tl:\t${string.loc.line}\tc:\t${string.loc.column}\t\t${string.value}`;
      })
      .join("\n");

    console.log(file);
    console.log(output);
    console.log("\n\n\n");
  }
});

console.log("skipped files");
console.log(skippedFiles.join("\n"));
