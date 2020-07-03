const fs = require("fs");

const readdir = require("recursive-readdir");
const wordcount = require("wordcount");

const ignore = ["node_modules", ".*", "!*.md"];

const getStatsForFile = (file) => new Promise((resolve) => {
  let data = "";

  fs
    .createReadStream(file, "utf-8")
    .on("data", (chunk) => {
      data += chunk;
    })
    .on("end", () => {
      resolve({
        name: file,
        characters: data.length,
        words: wordcount(data),
      });
    });
});

const readFiles = async (dir) => {
  const files = await readdir(dir, ignore);

  return await Promise.all(files.map(getStatsForFile));
}

const getMarkdownStats = async (dir) => {
  const files = await readFiles(dir);

  return files.reduce((acc, curr) => ({
    ...acc,
    characters: acc.characters + curr.characters,
    words: acc.words += curr.words
  }), {
    characters: 0,
    files,
    words: 0,
  });
}

module.exports = getMarkdownStats;
