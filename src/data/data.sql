CREATE TABLE IF NOT EXISTS users (
    id int PRIMARY KEY,
    name varchar(100) NOT NULL,
	email varchar(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (id, name, email)
VALUES (1, 'Sudarshan Sharma', 'sudarshan2896@gmail.com');