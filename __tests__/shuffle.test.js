const shuffle = require("../src/shuffle");
const data = require("../src/botsData")

describe("shuffle returns an array", () => {
  // CODE HERE
  test("Check if returned data is array", async () => {
    expect(shuffle(data)).toBeInstanceOf(Array);
  })

  test("Check if returns an array of the same length as the argument sent in", async () => {
    expect(shuffle(data)).toHaveLength(data.length);
  })

  test("Check if all the same items are in the array", async () => {
    expect(shuffle(data)).toEqual(expect.arrayContaining(data));
  })

});
