// A function that receives a JS object but reduces
// the size of the arrays to the configuratble number of elements
// the last element is "N more items"
// It works recursively
function compact(obj, config = {stringLimit: 300, arrayLimit: 3}) {
  const {stringLimit = 300, arrayLimit = 3} = config;

  // Handle null/undefined input
  if (obj === null || obj === undefined) {
    return obj;
  }

  const newObj = {};

  Object.keys(obj).forEach(key => {
    if (Array.isArray(obj[key])) {
      const len = obj[key].length;

      if (len === 0 || len === 1) {
        newObj[key] = obj[key];
        return;
      }

      let previousMoreItems = 0;
      // Check for both formats: "more items" and "<N more items>"
      if (typeof obj[key][len - 1] === 'string' &&
          (obj[key][len - 1].endsWith('more items') || obj[key][len - 1].endsWith('more items>'))) {
        // If the last item is a string ending with "more items", we need to keep track of the previous count
        const match = obj[key][len - 1].match(/(\d+) more items/);
        if (match) {
          previousMoreItems = parseInt(match[1]);
        }
        // Remove the last item from the array
        obj[key].pop();
      }

      const newLen = obj[key].length;

      if (newLen > arrayLimit) {
        newObj[key] = obj[key].slice(0, arrayLimit).concat([`<${newLen - arrayLimit + previousMoreItems} more items>`]);
      } else {
        if (previousMoreItems > 0) {
          // If there were previous "more items", we need to add them back
          newObj[key] = obj[key].concat([`<${previousMoreItems} more items>`]);
        } else {
          // Otherwise, just keep the array as is
          newObj[key] = obj[key];
        }
      }
    } else if (typeof obj[key] === 'string' && obj[key].length > stringLimit && !obj[key].endsWith('...')) {
      // If the string is longer than 300 characters, truncate it
      newObj[key] = obj[key].substring(0, stringLimit) + '...';
    } else {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        newObj[key] = compact(obj[key], config);
      } else {
        newObj[key] = obj[key];
      }
    }
  });

  return newObj;
}

export default compact;
