const express = require("express");
const router = express.Router();
const db = require("../../db/models");
const bcrypt = require("bcryptjs");
const { csrfProtection, asyncHandler } = require("../utils");
const { check, validationResult } = require("express-validator");
const {
  loginUser,
  logoutUser,
  requireAuth,
  restoreUser,
} = require("../../auth");

const permission = async (req, res, next) => {
  const numId = parseInt(req.params.id);
  const name = req.params.userName;
  let user = await db.User.findByPk(numId);
  if (req.session.auth == null) {
    return res.render("not-auth");
  }
  if (
    req.session.auth.userId == req.params.id &&
    req.params.userName == user.username
  ) {
    return next();
  }
  // console.log(`HEELO~~~~~~~~~~~~~~~~~~~`);
  return res.redirect("/");
};

router.get(
  "/users/edit/:id/:userName",
  permission,
  csrfProtection,
  async (req, res) => {
    const id = req.session.auth.userId;
    const user = await db.User.findByPk(id);
    const changes = await db.User.build();
    res.render("profile-edit", {
      id,
      user,
      _csrf: req.csrfToken(),
    });
  }
);

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
];

router.post(
  "/users/edit/:id/:userName",
  permission,
  userValidators,
  async (req, res) => {
    const id = req.session.auth.userId;
    const userId = parseInt(req.params.id);
    const user = await db.User.findByPk(userId);
    const allowed = Object.keys(req.body);
    const validatorErrors = validationResult(req);
    if (!validatorErrors.isEmpty()) {
      const errors = validatorErrors.array().map((error) => error.msg);
      return res.render("profile-edit", { errors, id, user });
    }
    for (let i of allowed) {
      if (req.body[i].length > 0) {
        user[i] = req.body[i].replace(/\s/g, "-");
      }
    }
    await user.save();
    res.redirect("/");
  }
);

module.exports = router;
