const mongo = require("mongodb").MongoClient;
var config;
const collectionName = "document";

try {
  config = require("./config.json");
} catch (e) {
  console.log(e);
}

async function getDb() {
  // let dsn = `mongodb+srv://${username}:${password}@cluster0.yzsjx.mongodb.net/${database}?retryWrites=true&w=majority`;
  dsn = "mongodb://localhost:27017/editor";
  // if (process.env.NODE_ENV === "test") {
  // }
  const client = await mongo.connect(dsn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await client.db();
  const collection = await db.collection(collectionName);
  return {
    collection: collection,
    client: client,
  };
}

module.exports = {
  getDb: getDb,
};
