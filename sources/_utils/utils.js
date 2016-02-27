/*
* A little function to check if the data contained in a declared variable exists
*/
export function dataIsEmpty(data) {
  let arrayIntoArray = (data instanceof Array) ? data.filter(array => !dataIsEmpty(array)).length === 0 : false;
  return (data === undefined || data === null || data.length === 0 || arrayIntoArray);
};

/*
* Function to display data on detail mission with placeholder when no data
*/
export function dataOrElse(data, empty) {
  return data !== null && data !== undefined ? data : empty;
};

/*
* Some API return html tag in their response (e.g. dribbble about key return <a href="#"></a> for link add)
*/
export function removeTag(s) {
  return s.replace(/(<(?:.|\n)*?>)/g, '');
};

/*
* Put the first letter of network name in uppercase
*/
export function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
};

/**
* Formatting big numbers
*/
export function format(nbr) {
  return (nbr + '').replace(/.(?=(?:.{3})+$)/g, '$& ');
};

/*
* Returns the sum of this array of Integers.
*/
export function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
};
