/**
* Do not push value to an array of already into
*/
Array.prototype.pushOnce = function(value) {
  if (this.indexOf(value) == -1) {
    this.push(value);
    return true;
  }

  return false;
}

/**
* Extend Array prototype function to add a .last() method
*/
if (!Array.prototype.last) {
  Array.prototype.last = function() {
    if (this.length > 0) return this[this.length - 1];
  };
};

/**
* Returns the sum of this array of Integers.
*/
export function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
};

/**
* Returns the length of an array
*/
export function size(arr) {
  return arr.length;
};
