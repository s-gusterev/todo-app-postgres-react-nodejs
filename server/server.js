require('dotenv').config();
const PORT = process.env.PORT || 8000;
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const app = express();
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth } = require('./middlewares/auth');
const UnauthorizedError = require('./errors/UnauthorizedError');
const ConflictError = require('./errors/ConflictError');

app.use(cors());
app.use(express.json());

// * Регистрация

app.post('/todo-app/signup', async (req, res, next) => {
  const { name, email, password } = req.body;
  const user_id = uuidv4();
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const signUp = await pool.query(
      `INSERT INTO users (email, hashed_password, user_name, user_id) VALUES($1, $2, $3, $4)`,
      [email, hashedPassword, name, user_id]
    );
    const token = jwt.sign({ user_id }, 'secret', { expiresIn: '24hr' });
    res.json({ name, email, token, user_id });
  } catch (error) {
    console.error(error);
    if (error.code === '23505') {
      next(new ConflictError(`${email} уже зарегистирован`));
      // res.json({ detail: `${email} уже зарегистирован` });
    } else {
      next(error);
    }

    // res.json({ detail: error.detail });
  }
});

//* Вход в систему

app.post('/todo-app/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const users = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    if (!users.rows.length) {
      return res.json({ error: `Пользователь ${email} не зарегистрирован!` });
    }
    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );
    const user_id = users.rows[0].user_id;
    const token = jwt.sign({ user_id }, 'secret', { expiresIn: '24hr' });
    if (success) {
      res.json({
        email: users.rows[0].email,
        token,
        name: users.rows[0].user_name,
        user_id: users.rows[0].user_id,
      });
    } else {
      throw new UnauthorizedError('Неправильные email или пароль');
      // res.json({ error: 'Неправильно введен email или пароль' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.use(auth);

// * Получение всех todos  *

app.get('/todo-app/todos', async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decodedToken = jwt.verify(token, 'secret');
    const user_id = decodedToken.user_id;
    const todos = await pool.query('SELECT * FROM todos WHERE user_id = $1', [
      user_id,
    ]);
    res.json(todos.rows);
  } catch (error) {
    console.error(error);
  }
});

// Получение данных пользователя по id
app.get('/todo-app/user', async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decodedToken = jwt.verify(token, 'secret');
    const user_id = decodedToken.user_id;
    const users = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      user_id,
    ]);
    res.json({
      email: users.rows[0].email,
      token,
      name: users.rows[0].user_name,
      user_id: users.rows[0].user_id,
    });
  } catch (error) {
    console.error(error);
  }
});

// * Создание новой записи

app.post('/todo-app/todos', async (req, res) => {
  const { user_email, title, progress, date, user_id } = req.body;
  const id = uuidv4();

  try {
    const newToDo = await pool.query(
      `INSERT INTO todos(id, user_email, title, progress, date, user_id) VALUES($1,$2,$3,$4,$5,$6)`,
      [id, user_email, title, progress, date, user_id]
    );
    res.json({ user_email, title, progress, date, id });
  } catch (error) {
    console.error(error);
  }
});

// * Редактирование записи

app.patch('/todo-app/todos/:id', async (req, res, next) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  try {
    const editToDo = await pool.query(
      'UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;',
      [user_email, title, progress, date, id]
    );
    res.json({ user_email, title, progress, date, id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// * Удаление

app.delete('/todo-app/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1;', [
      id,
    ]);
    res.json(deleteToDo);
  } catch (error) {
    console.error(error);
  }
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    statusCode: statusCode === 500 ? 500 : statusCode,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
