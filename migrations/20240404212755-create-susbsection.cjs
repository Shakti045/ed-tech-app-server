'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subsection', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      videourl:{
        type:Sequelize.STRING,
        allowNull:false,
      },
      duration:{
         type:Sequelize.INTEGER,
         allowNull:false
      },
      relatedsectionId:{
        type:Sequelize.INTEGER,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subsection');
  }
};