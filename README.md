# propfinderjs

A library to find a deeply nested property of an object by name

## Installation

```
npm install propfinderjs
```

## How to use

```js
const propFinder = require("propfinderjs")

const object = {
  value: 1,
  two: {
    value: 2,
    three: {
      value: "this is a string",
      four: {
        value: [0, 1, 2, 3, [[0, 1, 2, 3], [3.14, 3.1416]]]
      }
    }
  }
}

const result1 = propFinder.find(object, "three")

console.log(result1)

/* Output:

{ 'two.three.value': 'this is a string' }

*/

const result2 = propFinder.findAll(
        object, "value",
        { array: true } /* If you want to flatten Array */
    )

console.log(result2)

/* Output:

{ value: 1,
  'two.value': 2,
  'two.three.value': 'this is a string',
  'two.three.four.value.0': 0,
  'two.three.four.value.1': 1,
  'two.three.four.value.2': 2,
  'two.three.four.value.3': 3,
  'two.three.four.value.4.1.0': 3.14,
  'two.three.four.value.4.1.1': 3.1416,
  'two.three.four.value.4.0.0': 0,
  'two.three.four.value.4.0.1': 1,
  'two.three.four.value.4.0.2': 2,
  'two.three.four.value.4.0.3': 3 }

*/

const result3 = propFinder.findAll(object, "value")

console.log(result3)

/* Output:

{ value: 1,
  'two.value': 2,
  'two.three.value': 'this is a string',
  'two.three.four.value': [ 0, 1, 2, 3, [ [Array], [Array] ] ] }

*/

```