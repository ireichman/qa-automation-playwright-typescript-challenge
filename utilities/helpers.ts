/*
tools for simplifying the code. 
*/

export const testUsers = {
  validUser: { name: "standard_user", password: "secret_sauce" },
  invalidUser: { name: "invalid_user", password: "wrong_password" },
  lockedOutUser: { name: "locked_out_user", password: "secret_sauce" },
  problemUser: { name: "problem_user", password: "secret_sauce" },
  performanceGlitchUser: { name: "performance_glitch_user", password: "secret_sauce" },
  // Will add more users if time will allow for testing them. 
};

/**
 * Generates a random string based on specified options using character codes.
 * Currently there is a known bug where it's possible to generate a string not including all required characters.
 * @param length The length of the string to generate. Default is 8.
 * @param includeUppercase Whether to include uppercase letters. Default is false.
 * @param includeLowercase Whether to include lowercase letters. Default is true.
 * @param includeNumbers Whether to include numbers. Default is false.
 * @param includeSymbols Whether to include symbols. Default is false.
 * @returns Randomly generated string
 */

export function generateRandomString(
  length: number = 8,
  includeUppercase: boolean = false,
  includeLowercase: boolean = true,
  includeNumbers: boolean = false,
  includeSymbols: boolean = false
): string {
  // Create array of character code ranges based on options.
  const charRanges: Array<[number, number]> = [];

  if (includeUppercase) {
    charRanges.push([65, 90]); // A-Z
  }

  if (includeLowercase) {
    charRanges.push([97, 122]); // a-z
  }

  if (includeNumbers) {
    charRanges.push([48, 57]); // 0-9
  }

  if (includeSymbols) {
    charRanges.push([33, 47]); // ! to /
  }

  // If no character sets were selected (passing all false values to function), default to lowercase.
  if (charRanges.length === 0) {
    charRanges.push([97, 122]); // a-z
    console.warn("No character sets selected, defaulting to lowercase letters");
  }

  // Initialize empty string for results.
  let result = "";
  // Loop from 0 to the length of the string
  // and generate a random character from the selected ranges
  for (let i = 0; i < length; i++) {
    // generate a random number to select a character set from the ranges.
    const rangeIndex = Math.floor(Math.random() * charRanges.length);

    // generate a random number to select a character from the selected range.
    const charRange = charRanges[rangeIndex];

    // get the character code range.
    const min = charRange[0];
    const max = charRange[1];
    const rangeSize = max - min + 1;

    // generate a random number within the selected range.
    const randomNum = Math.floor(Math.random() * rangeSize);

    // convert the random number to a character code.
    const charCode = min + randomNum;

    result += String.fromCharCode(charCode);
  }

  return result;
};