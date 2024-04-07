import { Sequelize } from "sequelize";
import { sequelize} from "../config/db.js";
import { sendmail } from "../utils/mail.js";


export const Otp = sequelize.define(
  'Otp',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    code: {
      type: Sequelize.INTEGER,
      allowNull:false,
    },
    email:{
      type:Sequelize.STRING,
      allowNull:false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
  },
  {
    timestamps:true,
    updatedAt:false,
    modelName:'Otp',
    freezeTableName:true
  }
  
);

Otp.afterCreate(async(otp)=>{
  try {
    await sendmail(otp.email,'Otp to validate mail',`<p>Otp is ${otp.code}</p>`);
  } catch (error) {
     throw new Error(error);
  }
})