import { Sequelize } from "sequelize";
import { sequelize } from "../config/db.js";

export const Subsection = sequelize.define(
  'Subsection',{
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING,
      allowNull:false,
    },
    videourl:{
      type:Sequelize.STRING,
      allowNull:false,
    },
    duration:{
       type:Sequelize.INTEGER,
       allowNull:false
    },
    relatedsectionId:{
      type:Sequelize.INTEGER,
    }
  },
  {
    timestamps:false,
    freezeTableName:true,
     modelName:'Subsection'
  }
)

