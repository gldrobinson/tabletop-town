const { formatCategoryData } = require("../utils/formatData.utils");

describe("formatCategoryData", () => {
  it("returns an array of arrays", () => {
    expect(formatCategoryData([{}])).toEqual([[]]);
  });
  it("does not mutate original input array", () => {
    const input = [
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ];
    expect(input).toEqual([
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ]);
    expect(input[0]).toEqual({
      slug: "euro game",
      description: "Abstact games that involve little luck",
    });
  });
  it("returns an array with one element containing slug and description when passed an array with one object", () => {
    const input = [
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ];
    const output = [["euro game", "Abstact games that involve little luck"]];
    expect(formatCategoryData(input)).toEqual(output);
  });
  it("returns an array with multiple elements containing slug and description when passed an array with multiple object", () => {
    const input = [
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
      {
        slug: "social deduction",
        description: "Players attempt to uncover each other's hidden role",
      },
      { slug: "dexterity", description: "Games involving physical skill" },
    ];
    const output = [
      ["euro game", "Abstact games that involve little luck"],
      [
        "social deduction",
        "Players attempt to uncover each other's hidden role",
      ],
      ["dexterity", "Games involving physical skill"],
    ];
    expect(formatCategoryData(input)).toEqual(output);
  });
});
