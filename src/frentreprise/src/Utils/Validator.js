/* Maths checks, no need to test a formula */
/* istanbul ignore file */
export function validateSIREN(SIREN, strict = false) {
  // SIREN is 9 numeric characters only
  if (!/^[0-9]{9}$/.test(SIREN)) return false;

  if (!strict) return true;

  // SIREN verification works as following :
  // we reduce digits one by one, respecting the following rules
  const summed = SIREN.split("").reduce((sum, digit, index) => {
    digit = +digit;
    const even = index % 2 === 0;

    // if its array position is even :
    if (even) {
      // -> we add it to final sum without modifying it
      return sum + digit;
    } else {
      // if it's odd :
      // -> we double the digit
      digit = digit * 2;
      // -> if the new value is higher than 9, we substract 9
      // -> we add it to final sum
      return sum + (digit > 9 ? digit - 9 : digit);
    }
  }, 0);

  // final sum must be a multiple of 10
  return summed % 10 === 0;
}

export function validateSIRET(SIRET, strict = false) {
  // SIREN is 14 numeric characters only
  if (!/^[0-9]{14}$/.test(SIRET)) return false;

  if (!strict) return true;

  // SIREN verification works as following :
  // we reduce digits one by one, respecting the following rules
  const summed = SIRET.split("").reduce((sum, digit, index) => {
    digit = +digit;
    const odd = index % 2 !== 0;

    // if its array position is odd :
    if (odd) {
      // -> we add it to final sum without modifying it
      return sum + digit;
    } else {
      // if it's even :
      // -> we double the digit
      digit = digit * 2;
      // -> if the new value is higher than 9, we substract 9
      // -> we add it to final sum
      return sum + (digit > 9 ? digit - 9 : digit);
    }
  }, 0);

  // final sum must be a multiple of 10
  return summed % 10 === 0;
}
