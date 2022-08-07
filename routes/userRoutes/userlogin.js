const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const db = require("../../db/models");
const { csrfProtection, asyncHandler } = require("../utils");
const { check, validationResult } = require("express-validator");
const {
  loginUser,
  logoutUser,
  requireAuth,
  restoreUser,
} = require("../../auth");

router.get("/users", requireAuth, restoreUser, async (req, res) => {
  const userId = await req.session.auth.userId;
  const user = await db.User.findByPk(userId);
  const all = await db.User.findAll();
  return res.render("all-people", { all, user, title: "All Users" });
});

router.get("/users/login", csrfProtection, (req, res) => {
  res.render("user-login", {
    title: "Login",
    csrfToken: req.csrfToken(),
  });
});

const loginValidators = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password"),
];

router.post(
  "/users/login",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let errors = [];
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { email } });

      // console.log(user);
      if (user !== null) {
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashPassword.toString()
        );
        if (passwordMatch) {
          // console.log(`LMAO DOES IT RENDER HERE?`);
          loginUser(req, res, user);

          return res.redirect(`/questions`);
        }
      }

      errors.push("Login failed for the provided email address and password");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render("user-login", {
      title: "Login",
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

module.exports = router;
