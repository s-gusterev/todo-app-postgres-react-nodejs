CREATE DATABASE todo_app;

CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);

CREATE TABLE users (
   user_name VARCHAR(20),
   email VARCHAR(255) PRIMARY KEY,
   hashed_password VARCHAR(255)
);

ALTER TABLE users ADD COLUMN name VARCHAR(20)


/*INSERT INTO todos (id, user_email, title, progress, date) VALUES ('2', 'frontend.sg@gmail.com', 'First todo',10, '31.01.2023');*/

/*CREATE DATABASE "todo_app"
  WITH OWNER "postgres"
  ENCODING 'UTF8'
  LC_COLLATE = 'ru_RU.UTF-8'
  LC_CTYPE = 'ru_RU.UTF-8'
  TEMPLATE = template0;
  */
