import { DataTypes , Sequelize } from "sequelize";
import { sequelize } from "../config/db.js";




export const User = sequelize.define(
  'User',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        min:8
      }
    },
    profilepic:{
      type:DataTypes.STRING,
      allowNull:false
    },
    role:{
      type:DataTypes.ENUM('admin','student'),
      allowNull:false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt:{
      type:DataTypes.DATE
    }
  },
  {
    paranoid:true,
    freezeTableName:true,
    modelName:'User'
  }
);
