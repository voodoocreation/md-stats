#!/usr/bin/env node

const c = require("chalk");
const { argv } = require("yargs");
const getMarkdownStats = require("./index");

const { log } = console;

const [dir = "./"] = argv._;

const { env } = process;
const locale = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE || "en";
const isVerbose = !!argv.verbose;

/**
 * Format number
 *
 * @param num {Number}
 * @return {string}
 */
const format = (num) =>  {
  try {
    return num.toLocaleString(locale);
  } catch (error) {
    return `${num}`;
  }
}

getMarkdownStats(dir).then(stats => {
  if (isVerbose) {
    for (const file of stats.files) {
      log(c.white.underline(file.name));
      log(c.yellow("Word count:"), c.green(format(file.words)));
      log(c.yellow("Character count:"), c.green(format(file.characters)));
      log();
    }
  }

  log(c.yellow("Total Markdown files:"), c.green(format(stats.files.length)));
  log(c.yellow("Total word count:"), c.green(format(stats.words)));
  log(c.yellow("Total character count:"), c.green(format(stats.characters)));
});
