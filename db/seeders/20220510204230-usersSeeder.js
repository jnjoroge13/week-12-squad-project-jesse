'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { username: 'DaHayster', email: 'Cras.sed.leo@Vivamusmolestie.co.uk', hashPassword: '$2a$10$y4yYLMel8HsU5kh9AGR0ge0bkHLHFWbV.trCWfHDkRT1I6LNRT5WO', firstName: 'Daniel', lastName: 'Hays', createdAt: new Date(), updatedAt: new Date() },
      { username: 'BitWake66', email: 'massa.Integer@lectus.ca', hashPassword: '$2a$10$y4yYLMel8HsU5kh9AGR0ge0bkHLHFWbV.trCWfHDkRT1I6LNRT5WO', firstName: 'Wade', lastName: 'Woodard', createdAt: new Date(), updatedAt: new Date() },
      { username: 'MadamRosales', email: 'ligula@velitduisemper.ca', hashPassword: '$2a$10$y4yYLMel8HsU5kh9AGR0ge0bkHLHFWbV.trCWfHDkRT1I6LNRT5WO', firstName: 'Francessa', lastName: 'Rosales', createdAt: new Date(), updatedAt: new Date() },
      { username: 'JDLink', email: 'jdoe@outlookio.ca', hashPassword: '$2a$10$y4yYLMel8HsU5kh9AGR0ge0bkHLHFWbV.trCWfHDkRT1I6LNRT5WO', firstName: 'Jane', lastName: 'Doe', createdAt: new Date(), updatedAt: new Date() },
      { username: 'AlexaWu', email: 'aWoo@fakeness.com', hashPassword: '$2a$10$y4yYLMel8HsU5kh9AGR0ge0bkHLHFWbV.trCWfHDkRT1I6LNRT5WO', firstName: 'Alexa', lastName: 'Wu', createdAt: new Date(), updatedAt: new Date() },
      { username: 'ChaseRiddick', email: 'ChaseRiddick@fakeness.com', hashPassword: '$2a$10$y4yYLMel8HsU5kh9AGR0ge0bkHLHFWbV.trCWfHDkRT1I6LNRT5WO', firstName: 'Chase', lastName: 'Riddick', createdAt: new Date(), updatedAt: new Date() },
      { username: 'JorgeYang', email: 'JorgeYang@fakeness.com', hashPassword: '$2a$10$y4yYLMel8HsU5kh9AGR0ge0bkHLHFWbV.trCWfHDkRT1I6LNRT5WO', firstName: 'Jorge', lastName: 'Yang', createdAt: new Date(), updatedAt: new Date() },
      { username: 'JoelCruz', email: 'JoelCruz@fakeness.com', hashPassword: '$2a$10$y4yYLMel8HsU5kh9AGR0ge0bkHLHFWbV.trCWfHDkRT1I6LNRT5WO', firstName: 'Joel', lastName: 'Cruz', createdAt: new Date(), updatedAt: new Date() },
      { username: 'JesseNjoroge', email: 'JesseNjoroge@fakeness.com', hashPassword: '$2a$10$y4yYLMel8HsU5kh9AGR0ge0bkHLHFWbV.trCWfHDkRT1I6LNRT5WO', firstName: 'Jesse', lastName: 'Njoroge', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {
      id: { [Sequelize.Op.gt]: 0 }
    });
  }
};
