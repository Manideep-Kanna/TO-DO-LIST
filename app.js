const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("Public"));

var listItems = ["Learn Web Development", "Play Guitar", "Draw an ART"];
var workListItems = [];

app.get("/", (req, res) => {
  var day = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let today = day.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: today, newListItems: listItems });
});

app.post("/", (req, res) => {
  listItem = req.body.listItem;
  let listType = req.body.list;
  if (listItem != "") {
    if (listType == "Work") {
      workListItems.push(listItem);
      res.redirect("/work");
    } else {
      listItems.push(listItem);
      res.redirect("/");
    }
  }
  if (listType == "Work") {
    res.redirect("/work");
  } else {
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work Day", newListItems: workListItems });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("The server is listening on the port 3000");
});
