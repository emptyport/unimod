# js-unimod

This module provides access to Unimod modifications.

The modifications were retrieved from the [Unimod website](http://www.unimod.org/downloads.html) on May 17th, 2018. The file "unimod.obo" (format-version 1.2, date 2018:04:17) is used by this module to provide the data.

## Installation
npm install peptide-modifier --save

## Usage
```javascript
var unimod = require('js-unimod');

var oxidation = unimod.getByName('oxidation');
/*
{
    "id": "35",
    "name": "Oxidation",
    "mono_mass": 15.994915,
    "avge_mass": 15.9994,
    "composition": "O"
}
*/
var biotin = unimod.getById(3);
/*
{
    "id": "3",
    "name": "Biotin",
    "mono_mass": 226.077598,
    "avge_mass": 226.2954,
    "composition": "H(14) C(10) N(2) O(2) S"
}
*/
```

Data are returned as JavaScript objects with the following fields:
* id
* name
* mono_mass
* avge_mass
* composition

## Tests
You can run `npm test` to run the tests after installing the development dependencies.

## Future functionality
No future functionality is planned.

## License
This software is released under the MIT license.