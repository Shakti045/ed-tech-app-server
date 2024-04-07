postman_document_url = https://documenter.getpostman.com/view/33332009/2sA35Mxxzw

hosted server link=>
(note that:Hosting a server on Render.com's free plan may result in initial request delays due to server sleep after 15 minutes of inactivity. Subsequent requests should perform normally)

steps  to run the app locally =>

step1=> after cloning from github url open code in code editor
step2=> run command npm i to install all dependencies
step3=> create a .env file and write all the fileds given below

PORT = define your own port to run server
NODE_ENV = developement

<!-- for database i have used neon.tech database get all credentials from neon db -->
PGHOST=
PGDATABASE=
PGUSER=
PGPASSWORD=
ENDPOINT_ID=

<!-- for mail i have used nodemailer -->
MAIL_PASS=
MAIL_HOST=
MAIL_USER=

JWT_SECRET= give your own secret key

<!-- login to cloudinary and get thhese fields -->
CLOUD_NAME=
API_KEY=
API_SECRET=

step4=> run command : npx sequelize-cli db:migrate
it will create all tables on db

step5=> run command: npm run dev
it will start the server

step6(optional) = > if you wan to create admin account using than store below fields in .env file
ADMIN_EMAIL = 
ADMIN_PASSWORD = 
ADMIN_USERNAME = 
run command=> npx sequelize-cli db:seed:all
(by this you can also create many admin accounts from terminal)#   e d - t e c h - a p p - s e r v e r  
 