const flattenObject = (object = null, options = { array: true }) => {
  let result = {};
  let walked = [];
  let stack = [
    {
      object: object,
      stack: ""
    }
  ];

  let arrayCondition = false;

  while (stack.length > 0) {
    const item = stack.pop();
    let object = item.object;

    for (let property in object) {
      if (object.hasOwnProperty(property)) {
        if (options && options.array) {
          arrayCondition =
            Object.prototype.toString
              .call(object[property])
              .replace(/\[object/g, "")
              .replace(/[ \]]/g, "") == "Array";
        }

        if (
          (typeof object[property] == "object" &&
            object[property] != null &&
            Object.prototype.toString
              .call(object[property])
              .replace(/\[object/g, "")
              .replace(/[ \]]/g, "") == "Object") ||
          arrayCondition
        ) {
          let alreadyFound = false;
          for (let i = 0; i < walked.length; i++) {
            if (walked[i] === object[property]) {
              alreadyFound = true;
              break;
            }
          }

          if (!alreadyFound) {
            walked.push(object[property]);

            stack.push({
              object: object[property],
              stack: item.stack + (item.stack ? "." : "") + property
            });
          }
        } else {
          const value = object[property];
          const propertyName = item.stack + (item.stack ? "." : "") + property;
          result[propertyName] = value;
        }
      }
    }
  }

  return result;
};

let propFinder = {};

propFinder.findOne = (object = null, propertyName = "") => {
  if (!propertyName || !object) {
    throw new Error("object (1st argument) or propertyName (2nd argument) can't be empty or falsy value!\n\n");
  }

  const flatObject = flattenObject(object);

  let result = {};

  for (const property in flatObject) {
    const re = new RegExp(propertyName, "gi");

    if (re.test(property)) {
      result[property] = flatObject[property];
      break;
    }
  }

  return result;
};

propFinder.findAll = (object = null, propertyName = "", options = null) => {
  if (!propertyName || !object) {
    throw new Error("object (1st argument) or propertyName (2nd argument) can't be empty or falsy value!\n\n");
  }

  const flatObject = flattenObject(object, options);

  let result = {};

  for (const property in flatObject) {
    const re = new RegExp(propertyName, "gi");

    if (re.test(property)) {
      result[property] = flatObject[property];
    }
  }

  return result;
};

propFinder.find = propFinder.findOne;

module.exports = propFinder;
