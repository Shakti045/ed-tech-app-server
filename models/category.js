import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import { Course } from "./course.js";

export const Category = sequelize.define(
  "Category",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },                      
  },
  {
    hooks: {
      afterDestroy: (category) => {
        Course.destroy({
          where: {
            belongstocategory: category.id
          }
        })
      }
    },
    timestamps:false,
    freezeTableName: true,
    modelName: "Category"
  },
);

