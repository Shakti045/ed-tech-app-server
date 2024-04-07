import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Section } from "./section.js";

export const Course = sequelize.define(
    "Course",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING,
        allowNull:false
      },
      description:{
        type:DataTypes.STRING,
        allowNull:false
      },
      creatorId:{
          type:DataTypes.INTEGER,
          allowNull:false
      },
      belongstocategory:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      lavel:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1,
      },
      mode:{
        type:DataTypes.ENUM('recorded','live','live-recorded'),
        allowNull:false,
        validate:{
          isIn:{
            args:[['recorded','live','live-recorded']],
            msg:"Mode must be one of these values: recorded, live, live-recorded"
          },
        }
      },
      language:{
        type:DataTypes.ENUM('english','hindi'),
        allowNull:false,
        validate:{
          isIn:{
            args:[['english','hindi']],
            msg:"Language must be one of these values: english, hindi"
          },
        }
      },
      prerequisites:{
        type:DataTypes.ARRAY(DataTypes.STRING)
      },
      price:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
      thumbnail:{
        type:DataTypes.STRING,
        allowNull:false,
        isUrl:true
      } ,
      numberofenrolledstudents:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    },
    {
      hooks:{
        afterDestroy:(course)=>{
          Section.destroy({
            where:{
              relatedcourseId:course.id
            }
          })
      }
    },
      paranoid:true,
      freezeTableName: true,
      modelName: "Course",
    }
  );