import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import knex from "knex";
import handleRegister from "./controllers/register.js";
import handleSignIn from "./controllers/signin.js";
import handleProfileGet from "./controllers/profile.js";
import { handleImage, handleApiCall } from "./controllers/image.js";

const PORT = process.env.PORT || 3000;

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.post("/signin", handleSignIn(db, bcrypt));

app.post("/register", handleRegister(db, bcrypt));

app.get("/profile/:id", handleProfileGet(db));

app.put("/image", handleImage(db));

app.post("/imageurl", handleApiCall);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
