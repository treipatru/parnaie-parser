"use strict"

// Imports & vars --------------------------------------------------------------
const fs = require("fs");

if (!process.argv[2]) {
  console.log('No source file specified. Try: \n> node parse your-data-file.js\n');
  return;
}
const data = require("./" + process.argv[2]);

const today = new Date;
const timestamp = '' + today.getDate() + today.getHours() + today.getMinutes() + today.getSeconds();
const exportFileName = "output/" + timestamp+ ".txt";
const exportLogName = "output/" + timestamp + ".log";
let counter = 0;
let exportData = "";

// Use log4js to nicely create export logs
const log4js = require("log4js");
log4js.configure({
  appenders: {
    entry: {
      type: "file",
      filename: exportLogName
    }
  },
  categories: {
    default: {
      appenders: ["entry"],
      level: "debug"
    }
  }
});
const logger = log4js.getLogger("entries")

const reOne = /(.*)\s+(adj|adv|dim|expr|interj|n|prefix|s|vb)\.?\s*(f|invar|m|n|pl|propr|v)?\.?\s*(invar|pl|sg|v)?\.\s?(v)?\.?(.*)/;
const reTwo = /^(1\.[^2]*)?(2\.[^3\n]*)?(3\.[^4\n]*)?(4\.[^5\n]*)?(5\.[^6\n]*)?((?:6\.)?[^\n]*)?/;


// Functions -------------------------------------------------------------------
/**
 * Checks for truthy then either trims str and returns it or return empty
 * string.
 *
 * @function sanitizeVal
 * @param {string} str - The string to be checked.
 * @returns {*} - Sanitized str or val.
 */
 function sanitizeVal (str, key) {
  if (str) {
    let x = str.trim()
    if (x.length === 0) {
      return key + " \"\"";
    } else {
      return " " + key + " " + "\"" + x + "\"";
    }
  } else {
    return " " + key + " \"\"";
  }
}

/**
 * Process an array of strings, run a regex against each one then 
 * sanitize the results and store.
 *
 * @function parseData
 * @param {Array} arr - Array of strings we're processing.
 * @returns {Array} - Parsed data; an array of objects.
 */
 function parseData (arr) {
  arr.forEach((entry) => {
    if (entry !== null) {
      let matches = entry.match(reOne);

      if (matches) {
        counter ++;
        let str = 'HMSET ' + counter;

        matches.forEach((p, index) => {
          switch (index) {
            case 0:
              str = str + sanitizeVal(p, "full")
              break;
            case 1:
              str = str + sanitizeVal(p, "word")
              break;
            case 2:
              str = str + sanitizeVal(p, "prop0")
              break;
            case 3:
              str = str + sanitizeVal(p, "prop1")
              break;
            case 4:
              str = str + sanitizeVal(p, "prop2")
              break;
            case 5:
              str = str + sanitizeVal(p, "prop3")
              break;
            default:
              break;
          }
        })

        let defs = matches[6].match(reTwo)
        defs.forEach((p, index) => {
          switch (index) {
            case 1:
              str = str + sanitizeVal(p, "def0")
              break;
            case 2:
              str = str + sanitizeVal(p, "def1")
              break;
            case 3:
              str = str + sanitizeVal(p, "def2")
              break;
            case 4:
              str = str + sanitizeVal(p, "def3")
              break;
            case 5:
              str = str + sanitizeVal(p, "def4")
              break;
            case 6:
              str = str + sanitizeVal(p, "def5") + "\n"
              break;
            default:
              break;
          }
        })

        exportData += str
        logger.debug("✔ " + matches[1])
      }
    }
  })
}

/**
 * Format to JSON and write file to disk.
 *
 * @function writeFile
 * @param {*} o - What to stringify.
 * @param {string} fileName - Name of export file.
 */
 function writeFile (o, fileName) {
  // let fileContents = JSON.stringify(o);
  fs.writeFileSync(fileName, o);
}


// Run things ------------------------------------------------------------------
console.log("\n > Parsing...")
let output = parseData(data.dictionary);

console.log(" > Saving...")
writeFile(exportData, exportFileName);

console.log("    ❤ Data in " + exportFileName);
console.log("    ❤ Log  in " + exportLogName);
console.log(" > Done\n");