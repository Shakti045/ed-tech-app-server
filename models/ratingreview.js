import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const RatingReview = sequelize.define(
  "RatingReview",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
    timestamps:true,
    updatedAt:false,
    freezeTableName: true,
    modelName: "RatingReview"
  }
);
