# express-postgres-crud-api

A RESTful CRUD API built with **Express 5** and **PostgreSQL** (via the `pg` driver), using ES Modules.

## Tech stack

| Tool | Purpose |
| --- | --- |
| Express | HTTP server & routing |
| pg | PostgreSQL client |
| dotenv | Environment configuration |
| cors | Cross-origin requests |
| joi | Request validation |
| nodemon | Dev auto-reload |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env   # then fill in your values

# 3. Start PostgreSQL (Docker)
docker run --name postgres-db \
  -e POSTGRES_USER=<user> \
  -e POSTGRES_PASSWORD=<password> \
  -p 5432:5432 -d postgres

# 4. Create the database (via pgAdmin or psql): express-crud

# 5. Run the dev server
npm run dev
```

Server runs on `http://localhost:5001` by default.

## Project structure

```
src/
├── config/        # DB connection & other config
├── controllers/   # route handlers / business logic
├── data/          # SQL queries / DB access, seed data
├── middlewares/   # error handling, input validation, auth
├── models/        # table structure / entity definitions
├── routes/        # endpoint paths -> controllers mapping
└── index.js       # app entry: Express app, mount routes, listen
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start with nodemon (auto-reload) |
