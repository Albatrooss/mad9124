const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test");

const Person = mongoose.model("person", {
  name: String,
});

const pixel = new Person({ name: "tim" });
pixel.save().then((savedCat) => console.log(savedCat));
