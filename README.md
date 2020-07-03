Markdown Stats
==============

A simple tool to report on statistics of Markdown file content within the given directory (recursively).

Useful for reporting how much documentation exists within a project.

Available stats are:
  - Markdown file count
  - character count
  - word count


Usage
-----

### CLI
If the directory is omitted, it will run for the current directory.

If the `--verbose` flag is present, it will also display stats on a per-file basis.

#### Example
```shell script
md-stats ./path/to/files --verbose
```

### Node.js
The exported function can also be used in a Node.js environment, which will return the raw data.

#### Example
```javascript
const getMarkdownStats = require("md-stats");

const stats = await getMarkdownStats("./path/to/files");
```

The data returned is in the following format:
```
{
  characters: number,
  words: number,
  files: [
    {
      name: string,
      characters: number,
      words: number
    }
  ]
}
```
