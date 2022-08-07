"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      hashPassword: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Question, { foreignKey: "userId" });
    User.hasMany(models.Answer, { foreignKey: "userId" });
    User.hasMany(models.AnswerVote, { foreignKey: "userId" });
  };
  return User;
};
