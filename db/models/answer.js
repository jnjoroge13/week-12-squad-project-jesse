'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    questionId: DataTypes.INTEGER,
    body: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.User, {foreignKey: 'userId'})
    Answer.belongsTo(models.Question, {foreignKey: 'questionId'})
    Answer.hasMany(models.AnswerVote, {foreignKey: 'answerId'})
  };
  return Answer;
};
