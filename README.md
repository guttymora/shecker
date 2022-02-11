# Shecker 

[![npm version](https://badge.fury.io/js/shecker.svg)](https://badge.fury.io/js/shecker)

Library for Typesscript and Javascript to validate single values, simple objects & complex objects according a set of defined rules.
It's highly inspired by Laravel framework Validations: https://laravel.com/docs/9.x/validation
> :warning: This library is still in experimental stage. Be careful while using it.

> :warning: This library is **not intended** to validate emails, phone numbers or addresses formats.

## Installation
```
$ npm install shecker
```

## Usage
Shecker allows you to validate if a value meets your requirements based on a set of rules you defined:
```js
// validate() function returns an array of error objects
const {validate} = require('shecker');

const errors = validate('hello world', 'string|max:10');

if(errors.length > 0) { // Check if exists errors
    console.log(errors);
    /**
     * [
     *   {'hello world': 'Invalid size -> max:10'}
     * ]
     */
}
```
As you can see above, each rule attached to a value is separated by pipes (`|`)

You can also validate simple objects like:
```js
// validateObject() function returns an array of error objects
const {validateObject} = require('shecker');

const person = {
    name: 'Alex Black',
    age: 'twentyFour',
    hasChildren: 'no'
}
const rules = {
    name: 'required',
    age: 'required|number',
    hasChildren: 'required|boolean'
}

const errors = validateObject(human, rules);

console.log(errors);
/**
 * [
 *   {'age': 'Invalid type. Required: number'},
 *   {'hasChildren': 'Invalid type. Required: boolean'}
 * ]
 */
```

And check for nested objects too!
```js
const {validateObject} = require('shecker');

const vehicle = {
    wheelsCount: 4,
    engine: {
        horsepower: 420,
        fuel: {
            type: 'gasoline',
            consumption: 25.4
        }
    }
    ...
}
const rules = {
    'engine': 'required|object',
    'engine.horsepower': 'number',
    'engine.fuel.type': 'string',
    'engine.fuel.consumption': 'number',
}

const errors = validateObject(vehicle, rules);

// No errors
console.log(errors); // []
```

## API
### Methods
Name | Description
-----|------------
`validate` | Allows check a single value with a set of rules
`validateObject` | Allows check each attribute of an object and nested attributes with a set of rules

### Rules
Name | Description
-----|------------
`required` | Specifies the value needs to exist
`string` | The value has to be a String
`number` | The value has to be a Number
`boolean` | The value has to be: `1`, `0`, `true` or `false`
`date` | The value has to be an instance of Date
`onlydate:{format}` | The value has to be a string and has the right format and be a valid date.
`array` | The value has to be an Array
`object` | the value has to be an Object
`min:{n}`| For strings or arrays: The minimum length has to be `n`. For numbers, the value has to be equal or greater than `n`
`max:{n}` | For strings or arrays: The maximum length has to be `n`. For numbers, the value has to be equal or lower than `n`
`size:{n}` | Apply just for strings and arrays. The length has to be the same as `n`
`equals:{n}` | Apply just for numbers. The value has to be the same as `n`

> Quick note: The possible *formats* for the rule `onlydate` are: 
>- `mm-dd-yyyy` or `mm/dd/yyyy`
>- `dd-mm-yyyy` or `dd/mm/yyyy`
>- `yyyy-mm-dd` or `yyyy/mm/dd`

Example:
```js
validate('Hello world!', 'required|string|min:3,max:15');
/** 
 * required: Verify the value is not empty, null or undefined
 * string: The value has to be a string
 * min:3:  The value needs to have at least of 3 chars
 * max:15 the value needs to have maximum 15 chars
 */
```