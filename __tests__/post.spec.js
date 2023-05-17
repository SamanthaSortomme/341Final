const app = require("../app");
const supertest = require("supertest");
const { expect } = require("@jest/globals");
const request = supertest(app);

//////-----------USER TESTS
describe("Test Handlers", () => {
  test("responds to get /user", async () => {
    const res = await request.get("/user")
    expect(res.statusCode).toBe(200)
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
  })

  //   test("responds to post /user", async () => {
  //     const res = await request.post("/user").send({
  //       firstName: "Sonic",
  //       lastName: "TheHedgehog",
  //       gamesPlayed: "18",
  //     });
  //     expect(res.statusCode).toBe(201);
  //     expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
  //   });

  // test('responds to get /user by id', async () => {
  //     const res = await request.get('/user/645dab77d10178e68110fc48')
  //     expect(res.statusCode).toBe(200)
  //     expect(res.header['content-type']).toBe('application/json; charset=utf-8');

  // })
  // test('responds to put /user', async () => {
  //     const res = await request.put('/user/645db2055067a3b419708987').send({
  //         firstName: "update take 2",
  //         lastName: "2",
  //         gamesPlayed: "2"
  //     });
  //     expect(res.statusCode).toBe(204);
  // })
  // test('responds to delete /user by id', async () => {
  //     const res = await request.delete('/user/645ea0cc9d45184468e9261a');
  //     expect(res.statusCode).toBe(200)
  //     expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  // })

  /////----------GAME TESTS

  test('responds to post /game', async () => {
      const res = await request.post('/game').send({
          gameTitle: "Myst",
          releaseYear: "1993",
          language: "English",
          gameLength: "7.8 hours",
          rating: "pg",
          specialFeatures: "falling, puzzles, the joy of choosing your own adventure",
          cost: "9.98"
      });
      expect(res.statusCode).toBe(201)
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');

  })

  test('responds to get /game', async () => {
      const res = await request.get('/game')
      expect(res.statusCode).toBe(200)
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  })

  test('responds to get /game by id', async () => {
      const res = await request.get('/game/6462eda305a5adfc35618af2')
      expect(res.statusCode).toBe(200)
      expect(res.header['content-type']).toBe('application/json; charset=utf-8');

  })

  test('responds to put /game', async () => {
      const res = await request.put('/game/6462eda305a5adfc35618af2').send({
          gameTitle: "this is a test",
          releaseYear: "1",
          language: "English",
          gameLength: "3x longer than it should be",
          rating: "pg",
          specialFeatures: "testing code for CSE341",
          cost: "$80 per credit"
      });
      expect(res.statusCode).toBe(204);
  })

  // test('responds to delete /game by id', async () => {
  //     const res = await request.delete('/game/64596fc7f00d9cb76d53421b');
  //     expect(res.statusCode).toBe(200)
  //     expect(res.header['content-type']).toBe('application/json; charset=utf-8');
  // })

  //////-----------PLATFORM TESTS

  test("responds to get /platform", async () => {
    const res = await request.get("/platform")
    expect(res.statusCode).toBe(200)
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
  })

  test("responds to post /platform", async () => {
    const res = await request.post("/platform").send({
      platformName: "Nintendo NES",
      companyName: "Nintendo",
      price: "64.00",
    })
    expect(res.statusCode).toBe(201)
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
  })

  test("responds to get /platform by id", async () => {
    const res = await request.get("/platform/645ef2d6145cfd41ce698dc6")
    expect(res.statusCode).toBe(200)
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
  })

  test("responds to put /platform", async () => {
    const res = await request.put("/platform/6462efa6cabf67efb5376399").send({
      platformName: "Nintendo NES",
      companyName: "Nintendo",
      price: "99",
    })
    expect(res.statusCode).toBe(204)
  })

  //////------------end of platform tests

  /// Mod Test
  test("responds to get /mod", async () => {
    const res = await request.get("/mod")
    expect(res.statusCode).toBe(200)
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
  })

  test("responds to post /mod", async () => {
    const res = await request.post("/mod").send({
      mod: "Stardew Valley Expanded",
      game: "Stardew Valley",
      description: "Adds new locations, new characters, and new village",
      cost: "$10",
    })
    expect(res.statusCode).toBe(201)
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
  })

  test("responds to get /mod by id", async () => {
    const res = await request.get("/mod/64627ca5f0db6165530553d0")
    expect(res.statusCode).toBe(200)
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8")
  })

  test("responds to put /mod", async () => {
    const res = await request.put("/mod/64627ca5f0db6165530553d0").send({
      mod: "Stardew Valley Expanded",
      game: "Stardew Valley",
      description: "Adds new locations, new characters, and new village",
      cost: "$10",
    })
    expect(res.statusCode).toBe(204)
  })

  //////------------end of mod test

  // function filterByTerm(inputArr, searchTerm) {
  //   return inputArr.filter(function(arrayElement) {
  //     return arrayElement.url.match(searchTerm);
  //   });
  // }

  // describe("Filter function", () => {
  //   test.skip("it should filter by a search term (link)", () => {
  //     const input = [
  //       { id: 1, url: "https://www.url1.dev" },
  //       { id: 2, url: "https://www.url2.dev" },
  //       { id: 3, url: "https://www.link3.dev" }
  //     ];

  //     const output = [{ id: 3, url: "https://www.link3.dev" }];

  //     expect(filterByTerm(input, "link")).toEqual(output);
  //   });
  // });
});
