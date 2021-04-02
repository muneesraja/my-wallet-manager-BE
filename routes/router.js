const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  getProfile,
} = require("../controllers/Users");
const auth = require("../middleware/auth");

// PATH: /api/v1/user/
// @Title: Get All Users OR Register new user
router
  .route("/user")
  .get(getUsers)
  .post(
    [
      check("email", "Please enter a valid email").isEmail().normalizeEmail(),
      check("password", "A password must be 6 digits long").isLength({
        min: 6,
      }),
      check("name", "Please fill the name").not().isEmpty(),
    ],
    addUser
  );

// PATH: /api/v1/user/1
// @Title: GET or DELETE or UPDATE user by ID
router.route("/user/:id").get(getUser).put(updateUser).delete(deleteUser);

// PATH: /api/v1/login
// @Title: Login
router
  .route("/login/")
  .post(
    check("email", "Please enter a valid email").isEmail().normalizeEmail(),
    loginUser
  );

// PATH: /api/v1/profile
// @Title: Get current logged user details
router.route("/profile").get(auth, getProfile);

// PATH: /api/v1/sheet
// @Title: Get all Sheet or Add new sheet
router.route("/sheet").get(auth, getProfile);

module.exports = router;
