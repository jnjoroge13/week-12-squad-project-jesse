'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('AnswerVotes', [
      { vote: true, answerId: 1, userId: 5, createdAt: new Date(), updatedAt: new Date() },
      { vote: true, answerId: 1, userId: 4, createdAt: new Date(), updatedAt: new Date() },
      { vote: true, answerId: 1, userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { vote: false, answerId: 3, userId: 5, createdAt: new Date(), updatedAt: new Date() },
      { vote: true, answerId: 6, userId: 5, createdAt: new Date(), updatedAt: new Date() },
      { vote: true, answerId: 6, userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { vote: true, answerId: 7, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { vote: true, answerId: 7, userId: 5, createdAt: new Date(), updatedAt: new Date() },
      { vote: true, answerId: 7, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { vote: false, answerId: 8, userId: 4, createdAt: new Date(), updatedAt: new Date() },
      { vote: true, answerId: 10, userId: 5, createdAt: new Date(), updatedAt: new Date() },
      { vote: true, answerId: 10, userId: 1, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AnswerVotes', {
      id: { [Sequelize.Op.gt]: 0 }
    });
  }
};
