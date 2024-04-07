import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const PasswordResetToken = sequelize.define(
  "PasswordResetToken",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  },
  {
    timestamps:true,
    updatedAt:false,
    freezeTableName: true,
    modelName: "PasswordResetToken"
  }
);