import dotenv from 'dotenv';
dotenv.config({path:'.env'});

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const dbconfig = {
    "developement":{
        database:PGDATABASE,
        user:PGUSER,
        password:PGPASSWORD,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true, 
            }
        },
        host: PGHOST,
        port: 5432 ,
        ssl: {
        require: true,
       },
       seederStorage: 'sequelize',
    },
    "test":{
        database:PGDATABASE,
        user:PGUSER,
        password:PGPASSWORD,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true, 
            }
        },
        host: PGHOST,
        port: 5432 ,
        ssl: {
        require: true,
       },
    },
    "production":{
        database:PGDATABASE,
        user:PGUSER,
        password:PGPASSWORD,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true, 
            }
        },
        host: PGHOST,
        port: 5432 ,
        ssl: {
        require: true,
       },
    }
};

export default dbconfig;