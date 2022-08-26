const database = require("../models/database");
var db;
// database.setCollectionName("document");
// (async function () {
//   db = await database.getDb();

//   process.on("exit", () => {
//     db.client.close();
//   });
// })();


async function getItems() {
  database.setCollectionName("document");
  db = await database.getDb();
  const res = await db.collection.find().toArray();
  return res;
}

async function getItemById(item) {
  database.setCollectionName("document");
  db = await database.getDb();
  const result = await db.collection.findOne(item);
  return result;
}

async function addItem(newObj) {
  database.setCollectionName("document");
  db = await database.getDb();
  const result = await db.collection.insertOne(newObj);
  return result;
}

async function updateItem(item, newObj) {
  database.setCollectionName("document");
  db = await database.getDb();
  const result = await db.collection.replaceOne(item, newObj);
  return result;
}

async function deleteItem(item) {
  database.setCollectionName("document");
  db = await database.getDb();
  const result = await db.collection.deleteOne(item);
  return result;
}

module.exports = {
  getItems: getItems,
  getItemById: getItemById,
  addItem: addItem,
  updateItem: updateItem,
  deleteItem: deleteItem,
};
