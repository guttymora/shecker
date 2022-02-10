# Shecker

Library to validate single values, simple objects & complex objects according a set of defined rules.
It's highly inspired by Laravel framework Validations: https://laravel.com/docs/9.x/validation

## Installation
```
$ npm install shecker
```

## Usage
Shecker allows you to validate if a value meets your requirements based on a set of rules you defined:
```js
// validate() function returns an array of error objects
const {validateObject} = require('shecker');

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
As you can see, each rule attached to a value is separated by pipes (`|`)

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

// No errors
console.log(errors); // []
```