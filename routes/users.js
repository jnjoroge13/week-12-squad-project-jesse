// const bcrypt = require("bcryptjs");
// const db = require("../db/models");
// const express = require("express");
// const router = express.Router();
// const {
//   loginUser,
//   logoutUser,
//   requireAuth,
//   restoreUser,
// } = require("../auth.js");
// const { csrfProtection, asyncHandler } = require("./utils.js");
// const { check, validationResult } = require("express-validator");
// // router.get("/users", requireAuth, restoreUser, async (req, res) => {
// //   const userId = await req.session.auth.userId;
// //   const user = await db.User.findByPk(userId);
// //   const all = await db.User.findAll();
// //   // res.render("user-profile", { name: user.firstName });
// //   return res.render("all-people", { all, user });
// // });

// // router.get("/:id(\\d+)/:userName", async (req, res) => {
// //   const numId = parseInt(req.params.id);
// //   const name = req.params.userName;
// //   let user = await db.User.findByPk(numId);
// //   try {
// //     if (
// //       user.firstName === name &&
// //       numId === user.id &&
// //       req.session.auth.userId === numId
// //     ) {
// //       return res.render("user-profile");
// //     }
// //     if (user.firstName == name && req.session.auth.userId === numId) {
// //       return res.render("profile-found-logged", { name });
// //     }
// //     if (user.firstName != name) {
// //       return res.render("profile-not-found", { name });
// //     }
// //     if (user.firstName == name && req.session.auth.userId != numId) {
// //       return res.render("limited-view", {
// //         user,
// //         name,
// //         id: req.session.auth.userId,
// //       });
// //     }

// //     return res.render(`not-logged`, { name });
// //   } catch (error) {
// //     if (user) {
// //       return res.render("not-logged", { name: user.firstName });
// //     }
// //     res.render("profile-not-found", { name });
// //   }
// // });

// // router.get("/login", csrfProtection, (req, res) => {
// //   res.render("user-login", {
// //     title: "Login",
// //     csrfToken: req.csrfToken(),
// //   });
// // });

// // const loginValidators = [
// //   check("email")
// //     .exists({ checkFalsy: true })
// //     .withMessage("Please provide a value for Email Address"),
// //   check("password")
// //     .exists({ checkFalsy: true })
// //     .withMessage("Please provide a value for Password"),
// // ];

// // router.post(
// //   "/login",
// //   csrfProtection,
// //   loginValidators,
// //   asyncHandler(async (req, res) => {
// //     const { email, password } = req.body;

// //     let errors = [];
// //     const validatorErrors = validationResult(req);

// //     if (validatorErrors.isEmpty()) {
// //       const user = await db.User.findOne({ where: { email } });

// //       if (user !== null) {
// //         const passwordMatch = await bcrypt.compare(
// //           password,
// //           user.hashPassword.toString()
// //         );

// //         if (passwordMatch) {
// //           loginUser(req, res, user);
// //           return res.redirect(`/`);
// //           // return res.render("user-profile", { user });
// //           // return res.render("user-profile", {
// //           //   title: `${
// //           //     user.username.charAt(0).toUpperCase() + user.username.slice(1)
// //           //   }`,
// //           //   user,
// //           // });
// //         }
// //       }

// //       errors.push("Login failed for the provided email address and password");
// //     } else {
// //       errors = validatorErrors.array().map((error) => error.msg);
// //     }

// //     res.render("user-login", {
// //       title: "Login",
// //       email,
// //       errors,
// //       csrfToken: req.csrfToken(),
// //     });
// //   })
// // );

// router.post("/logout", (req, res) => {
//   logoutUser(req, res);
//   res.redirect("/");
// });

// // router.get("/signup", csrfProtection, (req, res) => {
// //   const user = db.User.build();
// //   res.render("user-signup", {
// //     title: "Sign Up",
// //     user,
// //     csrfToken: req.csrfToken(),
// //   });
// // });

// // const userValidators = [
// //   check("username")
// //     .exists({ checkFalsy: true })
// //     .withMessage("Please provide a value for username")
// //     .isLength({ max: 50 })
// //     .withMessage("Username must not be more than 50 characters long")
// //     .custom((value) => {
// //       return db.User.findOne({ where: { username: value } }).then((user) => {
// //         if (user) {
// //           return Promise.reject(
// //             "The provided Username is already in use by another account"
// //           );
// //         }
// //       });
// //     }),
// //   check("firstName")
// //     .exists({ checkFalsy: true })
// //     .withMessage("Please provide a value for first name")
// //     .isLength({ max: 50 })
// //     .withMessage("First name must not be more than 50 characters long"),
// //   check("lastName")
// //     .exists({ checkFalsy: true })
// //     .withMessage("Please provide a value for last name")
// //     .isLength({ max: 50 })
// //     .withMessage("Last name must not be more than 50 characters long"),
// //   check("email")
// //     .exists({ checkFalsy: true })
// //     .withMessage("Please provide a value for Email Address")
// //     .isLength({ max: 255 })
// //     .withMessage("Email Address must not be more than 255 characters long")
// //     .isEmail()
// //     .withMessage("Email Address is not a valid email")
// //     .custom((value) => {
// //       return db.User.findOne({ where: { email: value } }).then((user) => {
// //         if (user) {
// //           return Promise.reject(
// //             "The provided Email Address is already in use by another account"
// //           );
// //         }
// //       });
// //     }),
// //   check("password")
// //     .exists({ checkFalsy: true })
// //     .withMessage("Please provide a value for Password")
// //     .isLength({ max: 50 })
// //     .withMessage("Password must not be more than 50 characters long")
// //     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
// //     .withMessage(
// //       'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
// //     ),
// //   check("confirmPassword")
// //     .exists({ checkFalsy: true })
// //     .withMessage("Please provide a value for Confirm Password")
// //     .isLength({ max: 50 })
// //     .withMessage("Confirm Password must not be more than 50 characters long")
// //     .custom((value, { req }) => {
// //       if (value !== req.body.password) {
// //         throw new Error("Confirm Password does not match Password");
// //       }
// //       return true;
// //     }),
// // ];

// // router.post(
// //   "/signup",
// //   csrfProtection,
// //   userValidators,
// //   asyncHandler(async (req, res) => {
// //     const { username, firstName, lastName, email, password } = req.body;
// //     console.log(req.body);
// //     const user = await db.User.build({
// //       username,
// //       firstName,
// //       lastName,
// //       email,
// //     });

// //     const validatorErrors = validationResult(req);

// //     if (validatorErrors.isEmpty()) {
// //       const hashPassword = await bcrypt.hash(password, 10);
// //       user.hashPassword = hashPassword;
// //       await user.save();
// //       loginUser(req, res, user);
// //       res.redirect("/users");
// //     } else {
// //       const errors = validatorErrors.array().map((error) => error.msg);
// //       res.render("user-signup", {
// //         title: "Sign Up",
// //         user,
// //         errors,
// //         csrfToken: req.csrfToken(),
// //       });
// //     }
// //   })
// // );

// // module.exports = router;
