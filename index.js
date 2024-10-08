import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let usersQuery = await db.query("SELECT name, color, id FROM family_member ORDER BY id ASC");
let usersList = [
];

usersQuery.rows.forEach((user) => {
  usersList.push(user);
});

app.get("/", async (req, res) => {
  const result = await db.query(`SELECT country_code FROM visited_countries WHERE family_member_id = ${currentUserId}`);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    peopleTotal: usersList.length,
    users: usersList,
    color: "teal"
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    let countryCode = data.country_code;

    if (countryCode === "IO") {
      countryCode = "IN";
    }

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, family_member_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");

    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {

  const userid = req.body.user;

  const colorQuery = await db.query(`SELECT color FROM family_member WHERE id = ${userid}`);
  let colorVariable = "";

  colorQuery.rows.find((colorName) => {
    colorVariable = colorName.color
  });

  const result = await db.query(`SELECT country_code FROM visited_countries WHERE family_member_id = ${userid}`);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });

  currentUserId = userid;

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: usersList,
    color: colorVariable
  });
});

app.post("/new", async (req, res) => {
  res.render("new.ejs");

  const name = req.body.name;
  const color = req.body.color;

  db.query("INSERT INTO family_member (name, color) VALUES ($1, $2) RETURNING id", [name, color]);

  console.log(color + " " + name);

  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
