const { validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { token } = require("morgan");

// @desc  To get all users
// Route GET /api/v1/user
exports.getUsers = (req, res, next) => {
  res.send("Getting all the users");
};

// @desc  Add new User
// Route POST /api/v1/user
exports.addUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const { name, email, password } = req.body;
  try {
    // User Exist ?
    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const user = new User({
      name,
      email,
      password,
    });

    //Encrypted password
    const salt = await bcrypt.genSalt(10);
    const encryptedPass = await bcrypt.hash(password, salt);
    user.password = encryptedPass;

    await user.save();

    // return JWT

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("data.jwtSecret"),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
  }
};

// @desc  To get a user
// Route GET /api/v1/user/:id
exports.getUser = (req, res, next) => {
  res.send(`User ${req.params.id} has been retrived successfully`);
};

// @desc  To Update a user
// Route PUT /api/v1/user/:id
exports.updateUser = (req, res, next) => {
  res.send(`User ${req.params.id} has been Updated successfully`);
};

// @desc  To Delete a user
// Route DELETE /api/v1/user/:id
exports.deleteUser = (req, res, next) => {
  res.send(`User ${req.params.id} has been Deleted successfully`);
};
