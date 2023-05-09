const app = require('../app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)



//not reading env? 
describe('Test Handlers', () => {
    test('responds to post /user', async () => {
        const res = await request.post('/user').send({
            firstName: "Bilbo",
            lastName: "Baggins",
            gamesPlayed: "5"
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
    })
})












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