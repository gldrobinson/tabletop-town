const {
  formatCategoryData,
  formatReviewData,
  formatUserData,
} = require("../utils/formatData.utils");

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
  it("returns an array with one element containing slug and description when passed an array with one category object", () => {
    const input = [
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ];
    const output = [["euro game", "Abstact games that involve little luck"]];
    expect(formatCategoryData(input)).toEqual(output);
  });
  it("returns an array with multiple elements containing slug and description when passed an array with multiple category objects", () => {
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
describe("formatReviewData", () => {
  it("returns an array of arrays", () => {
    expect(formatReviewData([{}])).toEqual([[]]);
  });
  it("does not mutate original input array", () => {
    const input = [
      {
        title: "One Night Ultimate Werewolf",
        designer: "Akihisa Okui",
        owner: "mallionaire",
        review_img_url:
          "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body: "We couldn't find the werewolf!",
        category: "social deduction",
        created_at: new Date(1610964101251),
        votes: 5,
      },
    ];
    expect(input).toEqual([
      {
        title: "One Night Ultimate Werewolf",
        designer: "Akihisa Okui",
        owner: "mallionaire",
        review_img_url:
          "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body: "We couldn't find the werewolf!",
        category: "social deduction",
        created_at: new Date(1610964101251),
        votes: 5,
      },
    ]);
    expect(input[0]).toEqual({
      title: "One Night Ultimate Werewolf",
      designer: "Akihisa Okui",
      owner: "mallionaire",
      review_img_url:
        "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      review_body: "We couldn't find the werewolf!",
      category: "social deduction",
      created_at: new Date(1610964101251),
      votes: 5,
    });
  });
  it("returns an array with one element containing all object values when passed an array with one review object", () => {
    const input = [
      {
        title: "One Night Ultimate Werewolf",
        designer: "Akihisa Okui",
        owner: "mallionaire",
        review_img_url:
          "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body: "We couldn't find the werewolf!",
        category: "social deduction",
        created_at: new Date(1610964101251),
        votes: 5,
      },
    ];
    const expected = [
      [
        "One Night Ultimate Werewolf",
        "We couldn't find the werewolf!",
        "Akihisa Okui",
        "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        5,
        "social deduction",
        "mallionaire",
        new Date(1610964101251),
      ],
    ];
    expect(formatReviewData(input)).toEqual(expected);
  });
  it("returns an array with multiple elements containing all review object values when passed an array with multiple review objects", () => {
    const input = [
      {
        title: "One Night Ultimate Werewolf",
        designer: "Akihisa Okui",
        owner: "mallionaire",
        review_img_url:
          "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body: "We couldn't find the werewolf!",
        category: "social deduction",
        created_at: new Date(1610964101251),
        votes: 5,
      },
      {
        title: "A truly Quacking Game; Quacks of Quedlinburg",
        designer: "Wolfgang Warsch",
        owner: "mallionaire",
        review_img_url:
          "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
        review_body:
          "Ever wish you could try your hand at mixing potions? Quacks of Quedlinburg will have you mixing up a homebrew like no other. Each player buys different ingredients (chips) that are drawn at random to reach the most points, but watch out, you'd better not let your cauldrom explode.",
        category: "social deduction",
        created_at: new Date(1610964101251),
        votes: 10,
      },
      {
        title: "Build you own tour de Yorkshire",
        designer: "Asger Harding Granerud",
        owner: "mallionaire",
        review_img_url:
          "https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body:
          "Cold rain pours on the faces of your team of cyclists, you pulled to the front of the pack early and now your taking on exhaustion cards like there is not tomorrow, you think there are about 2 hands left until you cross the finish line, will you draw enough from your deck to cross before the other team shoot passed? Flamee Rouge is a Racing deck management game where you carefully manage your deck in order to cross the line before your opponents, cyclist can fall slyly behind front runners in their slipstreams to save precious energy for the prefect moment to burst into the lead ",
        category: "social deduction",
        created_at: new Date(1610964101251),
        votes: 10,
      },
    ];
    const expected = [
      [
        "One Night Ultimate Werewolf",
        "We couldn't find the werewolf!",
        "Akihisa Okui",
        "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        5,
        "social deduction",
        "mallionaire",
        new Date(1610964101251),
      ],
      [
        "A truly Quacking Game; Quacks of Quedlinburg",
        "Ever wish you could try your hand at mixing potions? Quacks of Quedlinburg will have you mixing up a homebrew like no other. Each player buys different ingredients (chips) that are drawn at random to reach the most points, but watch out, you'd better not let your cauldrom explode.",
        "Wolfgang Warsch",
        "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
        10,
        "social deduction",
        "mallionaire",
        new Date(1610964101251),
      ],
      [
        "Build you own tour de Yorkshire",
        "Cold rain pours on the faces of your team of cyclists, you pulled to the front of the pack early and now your taking on exhaustion cards like there is not tomorrow, you think there are about 2 hands left until you cross the finish line, will you draw enough from your deck to cross before the other team shoot passed? Flamee Rouge is a Racing deck management game where you carefully manage your deck in order to cross the line before your opponents, cyclist can fall slyly behind front runners in their slipstreams to save precious energy for the prefect moment to burst into the lead ",
        "Asger Harding Granerud",
        "https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        10,
        "social deduction",
        "mallionaire",
        new Date(1610964101251),
      ],
    ];
    expect(formatReviewData(input)).toEqual(expected);
  });
});
describe("formatUserData", () => {
  it("returns an array of arrays", () => {
    expect(formatUserData([{}])).toEqual([[]]);
  });
  it("does not mutate original input array", () => {
    const input = [
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];

    expect(input).toEqual([
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ]);
    expect(input[0]).toEqual({
      username: "mallionaire",
      name: "haz",
      avatar_url:
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
    });
  });
  it("returns an array with one element containing all user object values when passed an array with one user object", () => {
    const input = [
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];
    const expected = [
      [
        "mallionaire",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
        "haz",
      ],
    ];
    expect(formatUserData(input)).toEqual(expected);
  });
  it("returns an array with multiple arrays containing all user object values when passed an array with multiple user objects", () => {
    const input = [
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
      {
        username: "philippaclaire9",
        name: "philippa",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      },
      {
        username: "bainesface",
        name: "sarah",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
      },
    ];
    const expected = [
      [
        "mallionaire",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
        "haz",
      ],
      [
        "philippaclaire9",
        "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
        "philippa",
      ],
      [
        "bainesface",
        "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
        "sarah",
      ],
    ];
  });
});
