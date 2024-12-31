const asyncHandler = require("express-async-handler");
// const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

const transactionController = {
  create: asyncHandler(async (req, res) => {
    let data = req.body.data;
    // console.log(data);
    if (!data.type || !data.amount || !data.date) {
      throw new Error("All fields are required");
    }
    console.log(data.category);
    data.type = data.type.charAt(0).toUpperCase() + data.type.slice(1);
    console.log(data.type);

    const createdTransaction = await Transaction.create({
      user: req.user,
      type: data.type,
      category: data.category,
      amount: data.amount,
      date: data.date,
      description: data.description,
    });
    console.log(createdTransaction);
    res.json({
      user: req.user,
      type: data.type,
      category: data.category,
      amount: data.amount,
      date: data.date,
      description: data.description,
    });
  }),

  // lists: asyncHandler(async (req, res) => {
  //   const transactions = await Transaction.find({ user: req.user });
  //   res.json(transactions);
  // }),

  getFilteredTransactions: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;
    let filter = { user: req.user };

    if (startDate) {
      filter = { ...filter.date, date: { $gte: startDate } };
    }
    if (endDate) {
      filter = { ...filter.date, date: { $lte: endDate } };
    }

    if (type) {
      filter.type = type;
      filter.type = filter.type?.charAt(0).toUpperCase() + filter.type.slice(1);
    }

    if (category) {
      if (category === "All") {
        // do nothing
      } else if (category === "Uncategorized") {
        filter.category = "Uncategorized";
      } else {
        filter.category = category;
      }
    }
    console.log(filter.user);
    // (1);
    const transactions = await Transaction.find(filter);
    // transactions.getFilter();
    // console.log(transactions);
    res.json(transactions);
  }),

  update: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      transaction.type = req.body.type || transaction.type;
      transaction.category = req.body.category || transaction.category;
      transaction.amount = req.body.amount || transaction.amount;
      transaction.date = req.body.date || transaction.date;
      transaction.description = req.body.description || transaction.description;

      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    }
  }),
  delete: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      await transaction.deleteOne({ _id: req.params.id });
      res.json({ message: "Transaction deleted successfully" });
    }
  }),
};

module.exports = transactionController;