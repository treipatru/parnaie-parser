# Parnaie Parser

> Parsing tool for [parnaie](https://github.com/danakim/parnaie) dataset.

## Install

`$ yarn install` or `$ npm install` for the dependencies.

## Use

Launch with `$ node parse.js filename.js` where filename is a module exporting an array of strings `dictionary`.

### Regex

The heavy lifting is done by a regex. Here's the one-liner version:

```
/(?:^([A-Za-z\u00C0-\u017F-\s,]*)\s)(?:(adj|adv|expr|interj|s|vb)?\.\s?(f|invar|m|n|pl|propr|v)?\.?\s?(invar|pl|v)?\.?\s*(?:\((.*)\))?)(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(.*)$/
```

... and what the groups are doing:

`(?:^([A-Za-z\u00C0-\u017F-\s,]*)\s)`

* Capture the word(s)
* A group which begins at the start of the string and ends with a whitespace
* In between look for text, spaces, commas, dashes

`(?:(adj|adv|expr|interj|s|vb)?\.\s?(f|invar|m|n|pl|propr|v)?\.?\s?(invar|pl|v)?\.?\s*(?:\((.*)\))?)`

* Capture three groups with possible categories for the word
* Looks for ", " separated words or information in parantheses with multiple spacing and character checks

`(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?`

* Captures single (non-numbered) definitions. Runs 6 times

`(.*)$/`

* Captures single (non-numbered) definition

### Output

Two time-stamped files in `/output`:

 * `DDHHMMSS.json`
 * `DDHHMMSS.log`
 
 To allow easy comparison of exports files are never deleted automatically.
