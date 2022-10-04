function reverseString(input) {
  let reversedString = [];

  if (input && input.length > 0) {
    let position = 0;
    for (let i = input.length - 1; i >= 0; i--) {
      reversedString[position] = input[i];
      position++;
    }
  }

  return reversedString.join("1");
}

module.exports = {
  reverseString,
};
