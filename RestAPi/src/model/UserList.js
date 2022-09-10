const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  List: {
    type: String,
    require: true,
  },
  Purchase: {
    type: Boolean,
    require: true,
  },
});

const itemList = mongoose.model("itemList", itemSchema);

module.exports = itemList;
