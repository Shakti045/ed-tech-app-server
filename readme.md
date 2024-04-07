To format the instructions provided for running the app locally and include the Postman documentation URL and the note about potential delays on Render.com's free plan, you can structure it as follows:

---

**Postman Documentation URL:** [https://documenter.getpostman.com/view/33332009/2sA35Mxxzw](https://documenter.getpostman.com/view/33332009/2sA35Mxxzw)

**Note:** Hosting a server on Render.com's free plan may result in initial request delays due to server sleep after 15 minutes of inactivity. Subsequent requests should perform normally.

**Steps to Run the App Locally:**

1. Clone the repository from the GitHub URL provided and open the code in your preferred code editor.
   
2. Run the command `npm i` to install all dependencies.

3. Create a `.env` file in the root directory of the project and add the following fields, providing your own values:
   ```
   PORT= // Define your own port to run the server
   NODE_ENV=development
   PGHOST=
   PGDATABASE=
   PGUSER=
   PGPASSWORD=
   ENDPOINT_ID=
   MAIL_PASS=
   MAIL_HOST=
   MAIL_USER=
   JWT_SECRET= // Provide your own secret key
   CLOUD_NAME=
   API_KEY=
   API_SECRET=
   ```

4. Run the command `npx sequelize-cli db:migrate` to create all necessary tables in the database.

5. Start the server by running the command `npm run dev`.

6. *(Optional)* If you wish to create an admin account, add the following fields to the `.env` file and provide appropriate values:
   ```
   ADMIN_EMAIL=
   ADMIN_PASSWORD=
   ADMIN_USERNAME=
   ```
   Then, run the command `npx sequelize-cli db:seed:all` to create the admin account(s).

---

This structured format provides clear instructions for setting up and running the app locally, including handling potential delays in server response on Render.com's free plan.
 
 
