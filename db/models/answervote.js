"use strict";
module.exports = (sequelize, DataTypes) => {
  const AnswerVote = sequelize.define(
    "AnswerVote",
    {
      vote: DataTypes.BOOLEAN,
      answerId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  AnswerVote.associate = function (models) {
    AnswerVote.belongsTo(models.Answer, { foreignKey: "answerId" });
    AnswerVote.belongsTo(models.User, { foreignKey: "userId" });
  };
  return AnswerVote;
};
