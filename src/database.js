const mongo = require("mongodb").MongoClient;
var config;
const collectionName = "document";

try {
  config = require("./config.json");
} catch (e) {
  console.log(e);
}

async function getDb() {
  let dsn = `mongodb+srv://${config.username}:${config.password}@cluster0.yzsjx.mongodb.net/${config.database}?retryWrites=true&w=majority`;
  if (process.env.NODE_ENV === "test") {
    dsn = "mongodb://localhost:27017/editor";
  }
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
