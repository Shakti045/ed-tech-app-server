import { sequelize } from "../config/db.js";
import {DataTypes} from 'sequelize';

export const Enrollment = sequelize.define(
  'Enrollment',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    courseId:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    enrolledstudentId:{
      type:DataTypes.INTEGER,
      allowNull:false,
    }
  },
  {
    timestamps:false,
    freezeTableName:true,
    modelName:'Enrollment'
  }
);