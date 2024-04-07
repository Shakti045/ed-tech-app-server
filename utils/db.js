import { sequelize } from "../config/db.js";


export const syncDataBase = async ()=>{
  try {
    await sequelize.sync(); 
    console.log('Db synced successfully')
  } catch (error) {
    console.log(error);
    console.log('Db connection failed');
  }
}