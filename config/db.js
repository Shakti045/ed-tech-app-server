import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import dbconfig from './config.js';


dotenv.config({path:'.env'})

const runmode = process.env.NODE_ENV;
export const sequelize = new Sequelize(dbconfig[runmode]);



