const db = require("./db/models");

//The first middleware a user enters when a user is logging
//Only works if there is an account present
const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  };
};

//Logging out a user, delets the req.session.auth
const logoutUser = (req, res) => {
  delete req.session.auth;
};

const requireAuth = (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.render("not-auth", {title: `Unauthorized | StackCode`});
  }
  return next();
};

//This is what keeps the user loggin in during a session
const restoreUser = async (req, res, next) => {
  //checking if a session exits, current when they're being logged in
  if (req.session.auth) {
    //grabs userId
    const { userId } = req.session.auth;

    try {
      const user = await db.User.findByPk(userId);

      if (user) {
        res.locals.authenticated = true;
        res.locals.user = user;
        next();
      }
    } catch (err) {
      res.locals.authenticated = false;
      next(err);
    }
  } else {
    res.locals.authenticated = false;
    next();
  }
};

module.exports = {
  loginUser,
  logoutUser,
  requireAuth,
  restoreUser,
};
