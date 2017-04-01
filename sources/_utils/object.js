/*
* Extends a base object with all the key/values of another.
*/
export function extend(obj, other) {
  return Object.assign(obj, other);
}

/*
* Creates a shallow copy of an object.
*/
export function copy(obj) {
  const result = {};

  Object.keys(obj).forEach((key) => {
    result[key] = obj[key];
  });

  return result;
}

/*
* Returns a new object with the passed key removed.
*/
export function omit(obj, ...props) {
  const result = copy(obj);
  props.forEach(prop => delete result[prop]);
  return result;
}

/*
 * Reads a property at the specified path string
 * (e.g 'prop.nested.value') or undefined if the path is invalid.
 */
export function read(obj, path) {
  return path.split('.').reduce((acc, val) => {
    if (!acc) return undefined;
    return acc[val];
  }, obj);
}

/* Returns the size of the object */
export function size(obj) {
  return Object.keys(obj).length;
}
