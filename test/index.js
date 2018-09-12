const propFinder = require("../index");

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
};

//#region empty check
// propFinder.find()
// propFinder.find(object)
//#endregion empty check

//#region type check
// propFinder.find('', null)
// propFinder.find(false, false)
//#endregion type check

//#region falsy check
// propFinder.find(null, '')
//#endregion falsy check

const result1 = propFinder.find(object, "three");

console.log(result1);

const result2 = propFinder.findAll(object, "value", { array: true });

console.log(result2);

const result3 = propFinder.findAll(object, "value");

console.log(result3);