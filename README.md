# extract-strings
Extracts string literals from js files using the babel parser.

## Installation
```bash
$ npm install -g extract-strings 
```

## Usage

```
Usage: extract-strings [options]

Options:
  -f, --files <glob>           glob pattern of the files to read
  -s, --skipPattern <pattern>  regex pattern for skipping files
  -h, --help                   display help for command
```

## Example

files:
```js
// myJsFile.js
console.log("abc", "def");
```

```js
// myOtherJsFile.js
const x = "this is a string";

console.log(x);
```

```bash
$ extract-strings --files "./**/*.js"
./myJsFile.js
        l:      1       c:      19              def
        l:      1       c:      12              abc

./myOtherJsFile.js
        l:      1       c:      10              this is a string
```


```bash
$ extract-strings --files "./**/*.js" --skipPattern "myOther"
skipped files
./myOtherJsFile.js

./myJsFile.js
        l:      1       c:      19              def
        l:      1       c:      12              abc
```

