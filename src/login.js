const database = require("../models/database");

database.setCollectionName("user");

let db;
(async function () {
  db = await database.getDb();

  process.on("exit", () => {
    db.client.close();
  });
})();

async function getUsers() {
  const res = await db.collection.find().toArray();
  return res;
}

async function getUserById(item) {
  const result = await db.collection.findOne(item);
  return result;
}

async function addNewUser(newObj) {
  const result = await db.collection.insertOne(newObj);
  return result;
}
module.exports = {
  getUsers: getUsers,
  addNewUser: addNewUser,
  getUserById: getUserById,
};
