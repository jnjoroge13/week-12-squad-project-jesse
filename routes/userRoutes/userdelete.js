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
  // console.log(numId, `*********`, req.session.auth);
  const name = req.params.userName;
  let user = await db.User.findByPk(numId);
  if (req.session.auth == null) {
    return res.render("not-auth");
  }
  if (req.session.auth.userId == req.params.id) {
    return next();
  }
  return res.render("page-not-found", { auth: req.session.auth.userId });
};

router.post("/users/delete/:id", permission, async (req, res) => {
  const id = req.session.auth.userId;
  const user = await db.User.findByPk(id);
  await user.destroy();
  logoutUser(req, res);
  res.redirect("/");
});

module.exports = router;
