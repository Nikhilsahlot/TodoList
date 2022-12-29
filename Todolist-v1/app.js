const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true })); //to get data from html form
app.use(express.static("public"));
let items = [];
let workitems = [];
app.get("/", function (req, res) {
  const date = new Date();
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  let day = date.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, EJS1: items }); //key:value pair
});
app.post("/", function (req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workitems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  } //redirect to app.get and item got rendered there
});
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", EJS1: workitems });
});
app.post("/work", function () {
  let item = req.body.newItem;
  workitems.push(item);
  res.redirect("/work");
});
app.listen(3000, function () {
  console.log("ready to do list");
});
