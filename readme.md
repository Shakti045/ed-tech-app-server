# ed-tech-app-server

1. Postman_documentation_url.
    ```sh
    follow this link  to get api's in postman
    https://documenter.getpostman.com/view/33332009/2sA35Mxxzw
    ```

1. Hosted server link.
    ```sh
    https://ed-tech-app-server.onrender.com
    add /api/v1/__endpoints from routes folder__
    note that:Hosting a server on Render.com's free plan may result in initial request delays due to server sleep after 15 minutes of inactivity. Subsequent 
    requests should perform normally
    ```    
    
1. Clone the repository to your local machine.
    ```sh
    git clone https://github.com/Shakti045/ed-tech-app-server.git
    ```

1. Install the required packages.
    ```sh
    cd ed-tech-app-server
    npm install
    ```

1. create env file.
    ```sh
    create .env file and give the value given below
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

    ```

1. Migrate database.
    ```sh
    npx sequelize-cli db:migrate
    ```

1. Start Server.
     ```sh
    npm run dev
    ```
     
1. if you wan to create admin account using cli than store below fields in env file.
     ```sh
      ADMIN_EMAIL = 
     ADMIN_PASSWORD = 
     ADMIN_USERNAME =  
    ```
     
1. run command.
     ```sh
      npx sequelize-cli db:seed:all 
    ```    
