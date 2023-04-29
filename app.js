"use strict";
const express = require("express");
const app = express();
const port = process.env.PORT || 1337;
const morgan = require("morgan");


// import the graphql
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema
} = require('graphql')

// get data from database called query 
// identify data from database (update) called mutation  



// // create the root file that have the schema defined
const RootQueryType = require("./graphql/root.js");
const schema = new GraphQLSchema({
  query: RootQueryType
})


const http = require("http");

const { Server } = require("socket.io");
const server = http.createServer(app);

const cors = require("cors");
app.use(cors());

// use the schema with object with the root /graphql

app.use("/graphql", graphqlHTTP({
  schema: schema,
  graphiql: true,
})
);


const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://www.student.bth.se"],
    methods: ["GET", "POST"],
  },
});

const middleWare = require("./middlware/errorhandel");
const hello = require("./routes/hello");
const items = require("./routes/get_items");

app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/hello", hello);
app.use("/", items);

app.use(middleWare.middleWare),
  app.use(middleWare.notFoundError),
  app.use(middleWare.errorResult);


io.on("connection", function (socket) {
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

const apps = server.listen(port, () =>
  console.log(`Example API listning on port ${port}!`)
);
module.exports = apps;
