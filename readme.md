# Parnaie Parser

> Parsing tool for [parnaie](https://github.com/danakim/parnaie) dataset.

> We're converting an OCR output data of an actual dictionary to structured REDIS objects ready for import.

## Install

`$ yarn install` or `$ npm install` for the dependencies.

## Use

Launch with `$ node parse.js filename.js` where filename is a module exporting an array `dictionary` of strings (example in `data-sample.js`).

## Parsing

Each line is parsed in two stages.

First we extract the word and up to three individual categories (like _adjective_, _noun_, _singular_) and we set aside the remainder of the line.

```
(.*)\s+(adj|adv|dim|expr|interj|n|prefix|s|vb)\.?\s*(f|invar|m|n|pl|propr|v)?\.?\s*(invar|pl|sg|v)?\.\s?(v)?\.?(.*)
```

From that we extract all possible definitions.

```
^(1\.[^2]*)?(2\.[^3\n]*)?(3\.[^4\n]*)?(4\.[^5\n]*)?(5\.[^6\n]*)?((?:6\.)?[^\n]*)?
```


## Output

Two time-stamped files in `/output`:

* `DDHHMMSS.txt`
* `DDHHMMSS.log`

Each dictionary entry is output to a line like below:

```
HMSET 1847 full "mortăciune, mortăciuni s.f. 1. carne de foarte proastă calitatate pregătită în mâncare. 2. cadavru. 3. crimă. 4. v. mălai mare. 5. deținut bolnav cronic, cu sănătatea șubredă. 6. mandat de executare a pedepsei." word "mortăciune, mortăciuni" prop0 "s" prop1 "f" prop2 "" prop3 "" def0 "1. carne de foarte proastă calitatate pregătită în mâncare." def1 "2. cadavru." def2 "3. crimă." def3 "4. v. mălai mare." def4 "5. deținut bolnav cronic, cu sănătatea șubredă." def5 "6. mandat de executare a pedepsei."
```

Which after import could end up in an object such as:

```
item = {
    'id': '1847',
    'word': 'mortăciune, mortăciuni',
    'props': [
      's', 'f', '', ''
    ],
    'defs': [
      '1. carne de foarte proastă calitatate pregătită în mâncare.',
      '2. cadavru.',
      '3. crimă.',
      '4. v. mălai mare.',
      '5. deținut bolnav cronic, cu sănătatea șubredă.',
      '6. mandat de executare a pedepsei.',
    ]
}
```
