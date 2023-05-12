const app = require('../app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)


describe('Test Handlers', () => {
    test('responds to post /user', async () => {
        const res = await request.post('/user').send({
            firstName: "Bilbo",
            lastName: "Baggins",
            gamesPlayed: "5"
        });
        expect(res.statusCode).toBe(201)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');

    })
    test('responds to get /user', async () => {
        const res = await request.get('/user')
        expect(res.statusCode).toBe(200)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');

    })
    test('responds to get /user by id', async () => {
        const res = await request.get('/user/645dab77d10178e68110fc48')
        expect(res.statusCode).toBe(200)
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');

    })
    test('responds to put /user', async () => {
        const res = await request.put('/user/645db2055067a3b419708987').send({
            firstName: "update",
            lastName: "here",
            gamesPlayed: "22"
        });
        expect(res.statusCode).toBe(204);
        //does not return value
    })
    test('responds to delete /user by id', async () => {
        const res = await request.delete('/user/645e9a8ea0455f9a2a06e8cd');
        expect(res.statusCode).toBe(200);
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