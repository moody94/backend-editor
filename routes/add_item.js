var express = require("express");
var router = express.Router();
const urlencodedParser = express.urlencoded({ extended: true });
const search = require("../src/search");




router.post("/", urlencodedParser, async function (req, res) {
  var obj = {
    name: "Moody",
    bor: "malmö",
  };
//   res.redirect("/");
  const result = await search.addItem(obj);
  res.send(result);
});

module.exports = router;
