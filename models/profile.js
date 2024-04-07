import { Sequelize } from "sequelize";
import { sequelize } from "../config/db.js";

export const Profile = sequelize.define(
  "Profile",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId:{
      type:Sequelize.INTEGER,
      allowNull:false,
    },
    username: {
      type: Sequelize.STRING,
    },
    dob: {
      type: Sequelize.STRING,
    },
    location:{
      type:Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
  },
  {
    modelName: "Profile",
    freezeTableName: true,
  }
);