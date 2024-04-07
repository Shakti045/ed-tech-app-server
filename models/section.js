import { Sequelize } from "sequelize";
import { sequelize } from "../config/db.js";
import { Subsection } from "./susbsection.js";

export const Section =  sequelize.define(
  'Section',
  {
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
  },{
    hooks:{
      afterDestroy:(section)=>{
        Subsection.destroy({
          where:{
            relatedsectionId:section.id
          }
        })
      }
    },
    timestamps:false,
    freezeTableName:true,
    modelName:'Section'
  }
);

