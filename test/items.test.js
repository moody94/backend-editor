process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

chai.should();
chai.use(chaiHttp);

// get items positive
describe(" get items positive ", () => {
  it("It should GET All the Items", () => {
    chai
      .request(server)
      .get("/items")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.a("array");
        // response.body.length.should.be.eq(2);
      });
  });
});

//   get items nigative
describe(" get items nigative ", () => {
  it("It should GET All the Items", () => {
    chai
      .request(server)
      .get("/itemmm")
      .end((err, response) => {
        response.should.have.status(404);
      });
  });
});

// // Test Get route By Id positive
describe("get item positive ", () => {
  let id = "61550b0e28bf39d459b51ed1";
  it("It should GET an Item by ID positive", () => {
    chai
      .request(server)
      .get("/item/" + id)
      .end((err, response) => {
        response.should.have.status(200);
        // response.body.should.have.property("_id");
        response.body.should.have.property("name");
      });
  });
});

//   //   Test Get route By Id nigative
describe("get item nigative", () => {
  let id = "61550b0";
  it("It should GET an Item by ID nigative", () => {
    chai
      .request(server)
      .get("/item/" + id)
      .end((err, response) => {
        response.should.have.status(404);
      });
  });
});

// Test Post route
describe("post item positive", () => {
  it("It should POST an Item positive", () => {
    const newItem = {
      name: "Ahmed",
      bor: "lund",
    };
    chai
      .request(server)
      .post("/add")
      .send(newItem)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.have.a("object");
        response.body.should.have.property("acknowledged").eq(true);
      });
  });
});

//   Test Post route
describe("post item negative", () => {
  it("It should POST an item negative", () => {
    const newItem = {
      bor: "lund",
    };
    chai
      .request(server)
      .post("/adds")
      .send(newItem)
      .end((err, response) => {
        response.should.have.status(404);
      });
  });
});

//   Test Patch route
describe("patch item ", () => {
  it("It should Patch an item positive", () => {
    const newItem = {
      name: "Dany2",
      bor: "karlskrona2",
    };
    updateId = "616c67edbb0e4e97b5b44f58";
    chai
      .request(server)
      .patch("/update/" + updateId)
      .send(newItem)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.a("object");
        response.body.should.have.property("acknowledged").eq(true);
        response.body.should.have.property("modifiedCount").eq(1);
        response.body.should.have.property("matchedCount").eq(1);
      });
  });
});

//   Test Delete route
describe("delete item", () => {
  it("It should DALETE an item positive", () => {
    deleteId = "616c68b01435bdc5c837254c";
    chai
      .request(server)
      .delete("/delete/" + deleteId)

      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.have.property("deletedCount").eq(1);

      });
  });
});
