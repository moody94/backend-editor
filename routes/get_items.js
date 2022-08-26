const { ObjectId } = require("bson");
var express = require("express");
var router = express.Router();
const urlencodedParser = express.urlencoded({ extended: true });
const search = require("../src/search");
const auth = require("../src/login");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Create A User
router.post("/signup", urlencodedParser, async (req, res, next) => {
  let userObj = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  const existedUser = await auth.getUserById({ username: req.body.username });

  if (existedUser) {
    console.log("This is already exists");
    console.log(existedUser.name);

    next();
  } else {
    const result = await auth.addNewUser(userObj);
    res.status(200).send(result);
    console.log("Done");
  }
});

router.post("/login", urlencodedParser, async (req, res, next) => {
  let userObj = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const existedUser = await auth.getUserById({ username: req.body.username });
    // next();
    const isEqual = await bcrypt.compare(
      userObj.password,
      existedUser.password
    );

    if (!isEqual) {
      console.log("Password is incorrect!");
      // throw new Error("Password is incorrect!");
    } else {
      // redirect("/");
      console.log("correct!");
      res.status(200).send({ 'userId': existedUser._id })
      
      // res.send(existedUser._id)
    }
    const token = jwt.sign(
      {
        id: existedUser._id,
        username: existedUser.username,
      },
      "myPlaintextPasswordlongandhardP4$w0rD.",
      { expiresIn: "24h" }
    );

    theID = ObjectId(existedUser._id);
    console.log({ _id: existedUser._id, token: token });
    return { _id: existedUser._id, token: token };

  } catch {
    console.log("User does not exist");
  }
});

// Get All Items
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
    userId: req.body.userId
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
  res.send(result);
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
