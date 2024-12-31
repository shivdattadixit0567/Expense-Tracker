const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const userController = {
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      throw new Error("User already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userCreated = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.json({
      username: userCreated.username,
      email: userCreated.email,
      _id: userCreated._id,
    });
  }),
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      message: "login successful",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),

  profile: asyncHandler(async (req, res) => {
    console.log(req.user);
    const user = await User.findById("676d7559ae10e54812fd0d88");
    if (!user) {
      throw new Error("User not found");
    }
    res.json({
      username: user.username,
      email: user.email,
      _id: user._id,
    });
  }),

  changePassword: asyncHandler(async (req, res) => {
    const { password } = req.body.data;
    console.log(req.body.data);
    // console.log(newPassword);
    const user = await User.findById(req.user);

    if (!user) {
      throw new Error("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save({
      validateBeforeSave: false,
    });

    res.json({
      message: "Password updated successfully",
      newPassword: hashedPassword,
    });
  }),

  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body.data;
    console.log(req.body.data);
    const user = await User.findByIdAndUpdate(
      req.user,
      {
        username,
        email,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "Profile updated successfully",
      user,
    });
  }),
};

module.exports = userController;
