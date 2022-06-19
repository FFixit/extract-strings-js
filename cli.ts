#!/usr/bin/env node

import glob from "glob";
import { extractAll } from "./lib";
import { Command } from "commander";

const program = new Command();
program.requiredOption(
  "-f, --files <glob>",
  "glob pattern of the files to read"
);
program.option(
  "-s, --skipPattern <pattern>",
  "regex pattern for skipping files"
);

program.parse();

const options = program.opts();
const fileGlob = options.files;
const skipPattern = options.skipPattern;

const files = glob.sync(fileGlob);

const { output, skippedFiles } = extractAll(files, skipPattern);

if (skippedFiles.length > 0) {
  console.log("skipped files");
  console.log(skippedFiles.join("\n"), "\n");
}

console.log(output);
