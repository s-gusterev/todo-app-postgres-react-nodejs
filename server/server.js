require("dotenv").config();
const PORT = process.env.PORT || 8000;
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const app = express();
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

// * Получение всех todos  *

app.get("/todos/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;
  try {
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );
    console.log(todos.rows);
    res.json(todos.rows);
  } catch (error) {
    console.error(error);
  }
});

// * Создание новой записи

app.post("/todos", async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  console.log(user_email, title, progress, date);
  const id = uuidv4();

  try {
    const newToDo = await pool.query(
      `INSERT INTO todos(id, user_email, title, progress, date) VALUES($1,$2,$3,$4,$5)`,
      [id, user_email, title, progress, date]
    );
    res.json(newToDo);
  } catch (error) {
    console.error(error);
  }
});

// * Редактирование записи

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  try {
    const editToDo = await pool.query(
      "UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;",
      [user_email, title, progress, date, id]
    );
    res.json(editToDo);
  } catch (error) {
    console.error(error);
  }
});

// * Удаление

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteToDo = await pool.query("DELETE FROM todos WHERE id = $1;", [
      id,
    ]);
    res.json(deleteToDo);
  } catch (error) {
    console.error(error);
  }
});

// * Регистрация

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const signUp = await pool.query(
      `INSERT INTO users (email, hashed_password) VALUES($1, $2)`,
      [email, hashedPassword]
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "24hr" });
    res.json({ email, token });
  } catch (error) {
    console.error(error);
    res.json({ detail: error.detail });
  }
});

//* Вход в систему

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
