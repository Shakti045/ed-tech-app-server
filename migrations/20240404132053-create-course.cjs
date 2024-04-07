'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Course', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false
      },
      description:{
        type:Sequelize.STRING,
        allowNull:false
      },
      creatorId:{
          type:Sequelize.INTEGER,
          allowNull:false
      },
      belongstocategory:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      lavel:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:1,
      },
      mode:{
        type:Sequelize.ENUM('recorded','live','live-recorded'),
        allowNull:false,
        validate:{
          isIn:{
            args:[['recorded','live','live-recorded']],
            msg:"Mode must be one of these values: recorded, live, live-recorded"
          },
        }
      },
      language:{
        type:Sequelize.ENUM('english','hindi'),
        allowNull:false,
        validate:{
          isIn:{
            args:[['english','hindi']],
            msg:"Language must be one of these values: english, hindi"
          },
        }
      },
      prerequisites:{
        type:Sequelize.ARRAY(Sequelize.STRING)
      },
      price:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      thumbnail:{
        type:Sequelize.STRING,
        allowNull:false,
        isUrl:true
      } ,
      numberofenrolledstudents:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Course');
  }
};