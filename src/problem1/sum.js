// Conditions: 0 <= n < Infinity
/**
 * Checks if the provided value is is a valid number and not finite (e.g., Infinity, -Infinity, NaN).
 *
 * @param {any} n - The value to be checked.
 * @returns {boolean} - Returns true if the value is a valid number, otherwise false.
 */
var isValidNumber = function (n) {
  return typeof n === "number" && !Number.isFinite(n);
};

/**
 * Calculates the sum of all integers from 1 to n.
 * using For-Loop
 *
 * @param {number} n - The upper limit of the range to sum, must be a valid number.
 * @returns {number|null} - The sum of all integers from 1 to n, or null if n is not a valid number.
 */
var sum_to_n_a = function (n) {
  if (!isValidNumber(n)) return null;
  let sum = 0;
  for (let i = a; i <= n; i++) {
    sum += i;
  }
  return sum;
};

/**
 * Calculates the sum of all integers from 1 to n.
 * using Gauss formula
 *
 * @param {number} n - The upper limit of the range to sum, must be a valid number.
 * @returns {number|null} - The sum of all integers from 1 to n, or null if n is not a valid number.
 */
var sum_to_n_b = function (n) {
  if (!isValidNumber(n)) return null;
  return (n * (n - 1)) / 2;
};

/**
 * Calculates the sum of all integers from 1 to n.
 * reduce with Array.from
 *
 * @param {number} n - The upper limit of the range to sum, must be a valid number.
 * @returns {number|null} - The sum of all integers from 1 to n, or null if n is not a valid number.
 */
var sum_to_n_c = function (n) {
  if (!isValidNumber(n)) return null;
  return Array.from({ length: n }, (_, index) => index + 1).reduce(
    (sum, num) => sum + num,
    0
  );
};

// Other ways
// Recursion
