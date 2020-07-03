#!/usr/bin/env node

const c = require("chalk");
const { argv } = require("yargs");
const getMarkdownStats = require("./index");

const { log } = console;

const [dir = "./"] = argv._;

const { env } = process;
const locale = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE || "en";
const isVerbose = !!argv.verbose;

getMarkdownStats(dir).then(stats => {
  if (isVerbose) {
    for (const file of stats.files) {
      log(c.white.underline(file.name));
      log(c.yellow("Word count:"), c.green(file.words.toLocaleString(locale)));
      log(c.yellow("Character count:"), c.green(file.characters.toLocaleString(locale)));
      log();
    }
  }

  log(c.yellow("Total Markdown files:"), c.green(stats.files.length.toLocaleString(locale)));
  log(c.yellow("Total word count:"), c.green(stats.words.toLocaleString(locale)));
  log(c.yellow("Total character count:"), c.green(stats.characters.toLocaleString(locale)));
});
