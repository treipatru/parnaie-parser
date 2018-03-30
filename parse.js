// Imports & vars --------------------------------------------------------------
const fs = require("fs");
const data = require("./data-sample.js");
const today = new Date;
const timestamp = '' + today.getDate() + today.getHours() + today.getMinutes() + today.getSeconds();
const exportFileName = "output/" + timestamp+ "-export.json";
const exportLogName = "output/" + timestamp + "-export.log";

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

const rex = /(?:^([A-Za-z\u00C0-\u017F-\s,]*)\s)(?:(adj|adv|expr|interj|s|vb)?\.\s?(f|invar|m|n|pl|propr|v)?\.?\s?(invar|pl|v)?\.?\s*(?:\((.*)\))?)(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(.*)$/;


// Functions -------------------------------------------------------------------
/**
 * Checks for truthy then either trims str and returns it or return val.
 *
 * @function sanitizeVal
 * @param {string} str - The string to be checked.
 * @param {*} val - What to return if str is falsey.
 * @returns {*} - Sanitized str or val.
 */
 function sanitizeVal (str, val) {
  if (str) {
    let x = str.trim()
    return x.length === 0 ? val : x;
  } else {
    return val
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
  let parsed = arr.map((word) => {
    if (word !== null) {
      let matches = word.match(rex);

      if (!matches) {
        return "";
      } else {
        let obj = {
          props: [],
          defs: []
        }

        matches.forEach((p, index) => {
          if (index === 0) {
            obj.fullStr = sanitizeVal(p, false);
          } else if (index === 1) {
            obj.word = sanitizeVal(p, false);
          } else if (index > 1 && index < 6) {
            obj.props.push(sanitizeVal(p, false));
          } else if (index >= 6) {
            obj.defs.push(sanitizeVal(p, false));
          }
        })

        logger.debug("✔ " + obj.word)
        return obj
      }
    }
  });
  return parsed;
}

/**
 * Format to JSON and write file to disk.
 *
 * @function writeFile
 * @param {*} o - What to stringify.
 * @param {string} fileName - Name of export file.
 */
 function writeFile (o, fileName) {
  let fileContents = JSON.stringify(o);
  fs.writeFileSync(fileName, fileContents);
}


// Run things ------------------------------------------------------------------
console.log("\n > Parsing...")
let output = parseData(data.dictionary);

console.log(" > Saving...")
writeFile(output, exportFileName);

console.log("    ❤ Data in " + exportFileName);
console.log("    ❤ Log  in " + exportLogName);
console.log(" > Done\n");