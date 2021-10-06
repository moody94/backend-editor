const database = require("./database");

let db;

(async function () {
  db = await database.getDb();

  process.on("exit", () => {
    db.end();
  });
})();

async function getItems() {
  const res = await db.collection.find().toArray();
  return res;
}

async function getItemById(item) {
  const result = await db.collection.findOne(item);
  return result;
}

async function addItem(newObj) {
  const result = await db.collection.insertOne(newObj);
  return result;
}

async function updateItem(item, newObj) {
  const result = await db.collection.replaceOne(item, newObj);
  return result;
}

async function deleteItem(item) {
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
