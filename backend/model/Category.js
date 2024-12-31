const mongoose = require("mongoose");

const categoryScheama = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    default: "Uncategorized",
  },
  type: {
    type: String,
    required: true,
    default: ["Expense", "Income"],
  },
});

const Category = mongoose.model("Category", categoryScheama);

module.exports = Category;
