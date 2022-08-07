const express = require("express");
const { loginUser } = require("../../auth");
const router = express.Router();
const db = require("../../db/models");

router.get("/users/demo", async (req, res) => {
  const user = await db.User.findByPk(1);
  loginUser(req, res, user);
  res.redirect("/home");
});

module.exports = router;
