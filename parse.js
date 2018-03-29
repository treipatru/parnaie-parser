const fs = require('fs');
const data = require("./data.js");

const rex = /(?:^([A-Za-z\u00C0-\u017F-\s,]*)\s)(?:(adj|adv|expr|interj|s|vb)?\.\s?(f|invar|m|n|pl|propr|v)?\.?\s?(invar|pl|v)?\.?\s*(?:\((.*)\))?)(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(.*)$/;

let arr = data.dictionary.map((word) => {
  if (word !== null) {
    let matches = word.match(rex);

    if (!matches) {
      return "";
    } else {
      return matches.map((info) => {
        if (!info) {
          return false;
        } else {
          return info.trim();
        }
      });
    }
  }
});



let fileContents = JSON.stringify(arr);
fs.writeFileSync('export.json', fileContents);