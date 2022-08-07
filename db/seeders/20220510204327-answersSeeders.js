'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Answers', [
      {questionId: 1, body: 'Turpis cursus in hac habitasse platea dictumst quisque sagittis. Non pulvinar neque laoreet suspendisse interdum consectetur. Aliquet sagittis id consectetur purus. Tempor id eu nisl nunc mi.', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      {questionId: 1, body: 'Libero volutpat sed cras ornare arcu dui vivamus. Et ligula ullamcorper malesuada proin libero nunc consequat. Cras tincidunt lobortis feugiat vivamus at augue eget. Felis imperdiet proin fermentum leo vel orci. ', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      {questionId: 2, body: 'Nunc scelerisque viverra mauris in aliquam sem. Risus feugiat in ante metus dictum at. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in. Mattis pellentesque id nibh tortor id.', userId: 5, createdAt: new Date(), updatedAt: new Date() },
      {questionId: 2, body: 'Tempus imperdiet nulla malesuada pellentesque.', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      {questionId: 2, body: 'Quam lacus suspendisse faucibus interdum posuere lorem ipsum!', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      {questionId: 3, body: 'Iverra nam libero justo laoreet sit amet cursus sit. Aliquet eget sit amet tellus cras. Magna etiam tempor orci eu lobortis elementum nibh tellus.', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      {questionId: 4, body: 'Diam vulputate ut pharetra sit. Fames ac turpis egestas sed tempus urna. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Eget mauris pharetra et ultrices neque ornare aenean. ', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      {questionId: 4, body: 'Aliquam ultrices sagittis orci a scelerisque. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Id faucibus nisl tincidunt eget nullam non. Augue eget arcu dictum varius duis at consectetur lorem donec. Ut etiam sit amet nisl purus in mollis. Posuere lorem ipsum dolor sit. Facilisis sed odio morbi quis commodo odio.', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      {questionId: 4, body: 'Fermentum et sollicitudin ac orci phasellus egestas. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Sit amet commodo nulla facilisi nullam vehicula.', userId: 5, createdAt: new Date(), updatedAt: new Date() },
      {questionId: 4, body: 'Id aliquet lectus proin nibh nisl condimentum. Sed adipiscing diam donec adipiscing tristique risus. ', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      {questionId: 4, body: 'Mattis enim ut tellus elementum sagittis. In pellentesque massa placerat duis ultricies lacus sed turpis.', userId: 4, createdAt: new Date(), updatedAt: new Date() },
      {questionId: 6, body: 'Nisl purus in mollis nunc sed id semper. Feugiat nisl pretium fusce id velit ut tortor.', userId: 4, createdAt: new Date(), updatedAt: new Date() },
      {questionId: 6, body: 'Dignissim convallis aenean et tortor. Tincidunt eget nullam non nisi est. Ut etiam sit amet nisl purus. Eu non diam phasellus vestibulum lorem sed. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus.', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      {questionId: 2, body: 'Ut diam quam nulla porttitor massa id neque. Metus dictum at tempor commodo. Morbi quis commodo odio aenean sed adipiscing diam. Diam sollicitudin tempor id eu nisl nunc. Diam sit amet nisl suscipit adipiscing bibendum est ultricies.', userId: 2, createdAt: new Date(), updatedAt: new Date() },

    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Answers', {
      id: { [Sequelize.Op.gt]: 0 }
    });
  }
};
