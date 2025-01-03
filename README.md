<h2> Family Travel Tracker</h2>

<p>Instructions on how to download the source files and use the App: </p>

<h3>Terminal (Chosen directory to clone the files - Recommended --> Desktop)</h3>

- git clone https://github.com/KyoukanPT/family-travel-tracker.git

<hr>

<h3>Node Installation</h3>
 
- Download and install <a href="https://nodejs.org/en/download"> Node.js </a> <br>

<hr>

<h3>Project Folder Directory (Terminal)</h3>
- npm install <br>
- npm install <a href="https://expressjs.com/en/starter/installing.html"> Express </a> <br>
- npm install <a href="https://ejs.co/"> EJS </a> <br>
- npm install <a href="https://www.npmjs.com/package/body-parser"> Body Parser </a> <br>
- npm install <a href="https://www.npmjs.com/package/pg" >PG</a> <br>
- node index.js <br>

<hr>

<h3>Pre-Installation & Configurations </h3>
- Download <a href="https://www.pgadmin.org/download/"> PG Admin </a> <br>
- Install PG Admin and create the following tables and attributes: <br><br>

<b>family_member</b><br>
id <br>
name <br>
color <br>

<b>countries</b><br>
id <br>
country_code <br>
country_name <br>

<b>visited_countries</b><br>
countryid <br>
country_code <br>
family_member_id (FOREIGN KEY FROM "family_member" id) <br><br>

- Import "countries.csv" to pgadmin table "countries" <br>

<hr>

<h3> Documentation: </h3>

- https://www.pgadmin.org/docs/pgadmin4/8.12/index.html
- https://www.w3schools.com/sql/

<hr>

<h3>How to use the App?</h3>
<p> - After having everything set up and running the app with Node, go to <a href="http://localhost:3000/">Localhost</a>. </p>
<p> - If needed, click on "Add Family Member". </p>
<p> - Fill the input with a country of your choice. </p>
