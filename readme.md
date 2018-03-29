# Parnaie Parser

> Parsing script for [parnaie](https://github.com/danakim/parnaie) dataset.

#### Regex
One-liner:

```
/(?:^([A-Za-z\u00C0-\u017F-\s,]*)\s)(?:(adj|adv|expr|interj|s|vb)?\.\s?(f|invar|m|n|pl|propr|v)?\.?\s?(invar|pl|v)?\.?\s*(?:\((.*)\))?)(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(\s*?\d\.[A-Za-z\u00C0-\u017F- ,]*\.)?(.*)$/
```

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