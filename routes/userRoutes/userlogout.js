const express = require("express");
const router = new express.Router();
const { logoutUser } = require("../../auth");

router.post("/users/logout", (req, res) => {
  logoutUser(req, res);
  res.redirect("/");
});

module.exports = router;
