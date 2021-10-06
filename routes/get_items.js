const { ObjectId } = require("bson");
var express = require("express");
var router = express.Router();
const urlencodedParser = express.urlencoded({ extended: true });
const search = require("../src/search");

// get All Items
// try {

// } catch {

// }
router.get("/items", async function (req, res) {
  const ress = await search.getItems("");
  res.status(200).send(ress);
});

// Get Item by Id
router.get("/item/:id", getAnItem, async function (req, res) {
  res.send(res.item);
});

// create new item
router.post("/add", urlencodedParser, async function (req, res) {
  var obj = {
    name: req.body.name,
    bor: req.body.bor,
  };
  const result = await search.addItem(obj);
  res.status(201).send(result);
  console.log(req.body);
});

// update Item By Id
router.patch("/update/:id", getAnItem, async function (req, res) {
  newObj = { name: req.body.name, bor: req.body.bor };
  // res.item.name = req.body.name;
  // res.item.bor = req.body.bor;
  const result = await search.updateItem(res.item, newObj);
  res.send(result)
});


// delete Item By Id
router.delete("/delete/:id", getAnItem, async function (req, res) {
  const result = await search.deleteItem(res.item);
  res.status(201).send(result);
  console.log(result);
});

// get the ID
async function getAnItem(req, res, next) {
  let item;
  theId = ObjectId(req.params.id);
  item = await search.getItemById({ _id: theId });
  if (theId == null) {
    return res.status(404).json({ message: "cannot find item" });
  }
  res.item = item;
  next();
}
module.exports = router;
