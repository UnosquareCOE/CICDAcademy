const stringUtils = require("../strings");

describe("stringUtils", () => {
  describe("reverseString", () => {
    it("should reserve a string", async () => {
      // arrange
      const testString = "hello123";

      // act
      const result = stringUtils.reverseString(testString);

      // assert
      expect(result).toEqual("321olleh");
    });
  });
});
