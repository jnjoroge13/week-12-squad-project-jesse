const express = require("express");
const db = require("../../db/models");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const { csrfProtection, asyncHandler } = require("../utils");
const { check, validationResult } = require("express-validator");
const {
  loginUser,
  logoutUser,
  requireAuth,
  restoreUser,
} = require("../../auth");

router.get("/users/signup", csrfProtection, async (req, res) => {
  const user = await db.User.build();
  res.render("user-signup", {
    title: "Sign Up",
    user,
    csrfToken: req.csrfToken(),
  });
});

const userValidators = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for username")
    .isLength({ max: 50 })
    .withMessage("Username must not be more than 50 characters long")
    .custom((value) => {
      return db.User.findOne({ where: { username: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Username is already in use by another account"
          );
        }
      });
    }),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for first name")
    .isLength({ max: 50 })
    .withMessage("First name must not be more than 50 characters long"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for last name")
    .isLength({ max: 50 })
    .withMessage("Last name must not be more than 50 characters long"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address")
    .isLength({ max: 255 })
    .withMessage("Email Address must not be more than 255 characters long")
    .isEmail()
    .withMessage("Email Address is not a valid email")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Email Address is already in use by another account"
          );
        }
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password")
    .isLength({ max: 50 })
    .withMessage("Password must not be more than 50 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password")
    .isLength({ max: 50 })
    .withMessage("Confirm Password must not be more than 50 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),
];

router.post(
  "/users/signup",
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;
    // console.log(req.body);
    const user = await db.User.build({
      username,
      firstName,
      lastName,
      email,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashPassword = await bcrypt.hash(password, 10);
      user.hashPassword = hashPassword;
      // console.log(`WEFGAWHGBWRG ARE WER HERE`);
      await user.save();
      loginUser(req, res, user);
      res.redirect("/");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("user-signup", {
        title: "Sign Up",
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

module.exports = router;
