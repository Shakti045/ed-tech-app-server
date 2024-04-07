'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          min:{
            args:[[5]],
            msg:'Name should be atleast 5 characters long'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false,
        validate:{
          min:8
        }
      },
      profilepic:{
        type:Sequelize.STRING,
        allowNull:false
      },
      role:{
        type:Sequelize.ENUM('admin','student'),
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt:{
        type:Sequelize.DATE
      }
    },
  );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};