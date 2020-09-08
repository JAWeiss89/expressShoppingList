process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("./app") // this also takes care of importing app's dependencies
const items  = require("./fakeDb.js");

beforeEach(function() {
    let tomatoes = {name: "tomatoes", price: 12.00}
    let apples = {name: "apples", price: 3.50}
    let bread = {name: "bread", price: 2.99}

    items.push(tomatoes);
    items.push(apples);
    items.push(bread);
})

afterEach(function() {
    items.length = 0;
})

describe("GET /items", function() {
    test("Get all items", async function() {
        const res = await request(app).get("/items");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual([{name: "tomatoes", price: 12.00}, {name: "apples", price: 3.50}, {name: "bread", price: 2.99} ])
    })
})

describe("POST /items", function() {
    test("Post correctly-formatted item to items arr", async function() {
        const res = await request(app).post("/items").send({name: "grapes", price: 8.25})
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({added: {name: "grapes", price: 8.25}})
    })
    test("Post item with missing info", async function() {
        const res = await request(app).post("/items").send({name: "flowers"}) // missing price
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({error: "Missing information in request. Need values for body and price"})
    })
})

describe("GET /items/itemName", function() {
    test("Get info on one item that exists in database", async function() {
        const res = await request(app).get("/items/bread");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({name: "bread", price: 2.99})
    })
    test("Get info route when item doesn't exist", async function() {
        const res = await request(app).get("/items/pizza");
        expect(res.status).toEqual(404);
        expect(res.body).toEqual({error: "Item not found"})
    })
})

describe("PATCH /items/itemName", function() {
    test("Patch info on found item", async function() {
        const res = await request(app).patch("/items/bread").send({price: 1.23})
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({updated: {name: "bread", price: 1.23} })
    })
    test("Return error message when patching non-existing item", async function() {
        const res = await request(app).patch("/items/peaches").send({price: 3.33})
        expect(res.status).toEqual(404);
        expect(res.body).toEqual({error: "Item not found"})
    })
})

describe("DELETE /items/itemName", function() {
    test("Delete item if items exists in database", async function() {
        const res = await request(app).delete("/items/apples");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({message: "deleted item"})
    })
    test("Return error message if item not found", async function() {
        const res = await request(app).delete("/items/milk");
        expect(res.status).toEqual(404);
        expect(res.body).toEqual({error: "Item not found"})
    })
})

describe("Get 404 status if route hit that isn't defined", function() {
    test("Return 404 error", async function() {
        const res = await request(app).get("/dogs");
        expect(res.status).toEqual(404);
    })
})