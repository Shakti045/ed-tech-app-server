'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Section', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      relatedcourseId:{
         type:Sequelize.INTEGER,
         allowNull:false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Section');
  }
};