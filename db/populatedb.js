#! /usr/bin/env node

import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Client } = pg;

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR (255),
  first_name VARCHAR (255),
  last_name VARCHAR (255),
  admin BOOLEAN DEFAULT FALSE,
  club BOOLEAN DEFAULT FALSE,
  password VARCHAR (255)
);

INSERT INTO users (username, first_name, last_name, admin, club, password) 
VALUES
  ('Bryan', 'Bryan', 'Lund', TRUE, FALSE, 'password'),
  ('Odin', 'Odin', 'Lund', FALSE, TRUE, 'password'),
  ('Damon', 'Damon', 'Lund', FALSE, TRUE, 'password');

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER REFERENCES users (id),
  title VARCHAR (255),
  body TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts (user_id, title, body)
VALUES
  (1, 'Hello', 'Hello, world!'),
  (2, 'Goodbye', 'Goodbye, world!'),
  (3, 'Hello', 'Hello, world!');
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
