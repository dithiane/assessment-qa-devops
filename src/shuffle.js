// Create an array of shuffled values, using a version of the
// [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).

const copyArray = (source, array) => {
  let index = -1;
  const length = source.length;

  array || (array = new Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
};

module.exports = (array) => {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  let index = -1;
  const lastIndex = length - 1;
  const result = copyArray(array);
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    const value = result[rand];
    result[rand] = result[index];
    result[index] = value;
  }
  return result;
};

// The MIT License
//
// Copyright JS Foundation and other contributors <https://js.foundation/>
//
// Based on Underscore.js, copyright Jeremy Ashkenas,
// DocumentCloud and Investigative Reporters & Editors <http://underscorejs.org/>
//
// This software consists of voluntary contributions made by many
// individuals. For exact contribution history, see the revision history
// available at https://github.com/lodash/lodash
//
// The following license applies to all parts of this software except as
// documented below:
//
// ====
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// ====
//
// Copyright and related rights for sample code are waived via CC0. Sample
// code is defined as all source code displayed within the prose of the
// documentation.
//
// CC0: http://creativecommons.org/publicdomain/zero/1.0/
//
// ====
//
// Files located in the node_modules and vendor directories are externally
// maintained libraries used by this software which have their own
// licenses; we recommend you read them, as their terms may differ from the
// terms above.
