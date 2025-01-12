const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

const categoryController = {
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;

    if (!name || !type) {
      throw new Error("All fields are required");
    }

    const normalizeName = name.toLowerCase();

    const validTypes = ["expense", "income"];

    // console.log(type);
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error("Invalid category type" + type);
    }

    // check if the category already exist within this account

    const categoryExist = await Category.findOne({
      name: normalizeName,
      user: req.user,
    });

    if (categoryExist) {
      throw new Error("Category already Exist");
    }

    const categoryCreated = await Category.create({
      name: normalizeName,
      type: type,
      user: req.user,
    });

    res.status(201).json(categoryCreated);
  }),

  lists: asyncHandler(async (req, res) => {
    const category = await Category.find({ user: req.user });
    // console.log(req.user);
    if (!category) {
      res.json({ message: "Category not found" });
    }
    res.status(201).json(category);
  }),

  update: asyncHandler(async (req, res) => {
    const { type, name } = req.body;
    const categoryId = req.params.id;

    const normalizedName = name.toLowerCase();
    const category = await Category.findById(categoryId);

    if (!category && category.user.toString() !== req.user.toString()) {
      throw new Error("Category not found or user not authorized");
    }
    const oldName = category.name;
    category.name = normalizedName;
    category.type = type;
    const updatedCategory = await category.save();

    if (oldName !== normalizedName) {
      await Transaction.updateMany(
        {
          user: req.user,
          category: oldName,
        },
        {
          $set: { category: normalizedName },
        }
      );
    }
    res.json({ updatedCategory });
  }),

  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    // console.log(category);
    if (category && category.user.toString() === req.user.toString()) {
      const defaultCategory = "Uncategorized";
      await Transaction.updateMany(
        {
          user: req.user,
          category: category.name,
        },
        {
          $set: { category: defaultCategory },
        }
      );
      const deletedCategory = await Category.deleteOne({ _id: req.params.id });
      res.json({
        message: "Category deleted and transactions updated successfully",
      });
    } else {
      throw new Error("Category not found or user not authorized");
    }
  }),
};

module.exports = categoryController;
