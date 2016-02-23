/* Object util functions */

/*
* Extends a base object with all the key/values of another.
*/
export function extend(obj, other) {
  return Object.assign(obj, other);
};

/*
* Creates a shallow copy of an object.
*/
export function copy(obj) {
  let result = {};
  Object.keys(obj).forEach(key => result[key] = obj[key]);
  return result;
};

/*
* Returns a new object with all its key/values mapped.
* A tuple (Array of size 2) must be returned from the map function.
*/
export function map(obj, fn) {
  let result = {};
  for (let key in obj) {
    let [newKey, newValue] = fn(key, obj[key]);
    result[newKey] = newValue;
  }
  return result;
};

/*
* Returns a new object with all its keys mapped.
*/
export function mapKeys(obj, fn) {
  let result = {};
  for (let key in obj) {
    let newKey = fn(key, obj[key]);
    result[newKey] = obj[key];
  }
  return result;
};

/*
* Returns a new object with all its values mapped.
*/
export function mapValues(obj, fn) {
  let result = {};
  for (let key in obj) {
    result[key] = fn(key, obj[key]);
  }
  return result;
};

/*
* Returns a new object with only the original object's keys that passed the predicate.
*/
export function filter(obj, predicate) {
  let result = {};
  Object.keys(obj).forEach(key => {
    if (predicate(key, obj[key])) result[key] = obj[key];
  });
  return result;
};

/*
* Returns a new object with the passed key removed.
*/
export function omit(obj, ...props) {
  let result = copy(obj);
  props.forEach(prop => delete result[prop]);
  return result;
};

/*
* Creates a JS Set (i.e {fizz: 1, buzz: 1}) from a list of arguments;
* The keys are the toString'ed arguments while the values are truthy.
*/
export function Set() {
  let set = {};
  for (let i = 0; i < arguments.length; i++) {
    set[arguments[i]] = 1;
  }
  return set;
};

/*
* Returns a new Array with all the values found in the passed object.
*/
export function values(obj) {
  let result = [];
  Object.keys(obj).forEach(key => result.push(obj[key]));
  return result;
};

/*
 * Reads a property at the specified path string (e.g 'prop.nested.value') or undefined if the path is invalid.
 */
export function read(obj, path) {
  return path.split('.').reduce((acc, val) => {
    if (!acc) return undefined;
    else return acc[val];
  }, obj);
};

/*
 * Reads a property at the specified path string or the specified
 * fallback value if either the path is invalid or the value is nullsy.
 */
export function readOrElse(obj, path, elseValue) {
  const value = read(obj, path);
  if (value !== null && value !== undefined) return value;
  else return elseValue
};


/* Returns the size of the object */
export function size(obj) {
  return Object.keys(obj).length;
};

/* Tests whether a predicate holds for at least one key/value pair */
export function some(obj, predicate) {
  for (let key in obj) {
    if (predicate(key, obj[key])) return true;
  }
  return false;
};

/**
* Returns whether the passed reference is an object.
*/
export function isObject(x) {
  return x && typeof x == 'object';
};

/**
* Returns whether the passed reference is a function.
*/
export function isFunction(x) {
  return Object.prototype.toString.call(x) === '[object Function]';
};
