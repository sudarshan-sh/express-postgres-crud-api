# express-postgres-crud-api

A RESTful CRUD API built with **Express 5** and **PostgreSQL** (via the `pg` driver), using ES Modules.

> **Setup goal:** anyone (including future-me after a long break) should be able to clone this repo and get the server running by copy-pasting the steps below, without remembering anything.

---

## Tech stack

| Tool | Purpose |
| --- | --- |
| Node.js 18+ | Runtime (developed on Node 24) |
| Express 5 | HTTP server & routing |
| pg | PostgreSQL client (connection pool) |
| dotenv | Loads `.env` into `process.env` |
| cors | Cross-origin requests |
| joi | Request validation |
| nodemon | Dev auto-reload |

---

## Prerequisites

Install these once on the machine:

1. **Node.js 18 or newer** — check with `node -v`. Download: https://nodejs.org
2. **PostgreSQL** — you need a running Postgres server. Pick **one**:
   - **Option A – Docker** (nothing to install except Docker Desktop): https://www.docker.com/products/docker-desktop
   - **Option B – Native install** + optionally **pgAdmin** (GUI): https://www.postgresql.org/download/
3. **Git** — check with `git --version`.

---

## Setup — step by step

### 1. Clone and enter the project

```bash
git clone https://github.com/sudarshan-sh/express-postgres-crud-api.git
cd express-postgres-crud-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the `.env` file

Copy the template, then open `.env` and fill in real values:

```bash
# macOS / Linux / Git Bash
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

`.env` is git-ignored — it never gets committed. Contents:

```dotenv
PORT=5001

# PostgreSQL connection
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user          # any username you choose
DB_PASSWORD=your_db_password   # matching password
DB_NAME=express-crud          # the database this app uses
```

> Use your own values. The examples below assume `DB_USER=your_db_user`, `DB_PASSWORD=your_db_password`, `DB_NAME=express-crud` — substitute whatever you actually put in `.env`.

> These exact variable names are read in [`src/config/db.js`](src/config/db.js) and [`src/index.js`](src/index.js). If you rename one, rename it in both places.

### 4. Start PostgreSQL and create the database

Do **one** of the following, using the same `DB_USER` / `DB_PASSWORD` / `DB_NAME` you put in `.env`.

#### Option A — Docker (recommended, disposable)

```bash
docker run --name express-crud-pg \
  -e POSTGRES_USER=your_db_user \
  -e POSTGRES_PASSWORD=your_db_password \
  -e POSTGRES_DB=express-crud \
  -p 5432:5432 \
  -d postgres:16
```

That single command creates the user, password **and** the `express-crud` database. Done — skip to step 5.

Useful later:

```bash
docker start express-crud-pg     # after a reboot
docker stop express-crud-pg
docker rm -f express-crud-pg      # delete it entirely
docker exec -it express-crud-pg psql -U your_db_user -d express-crud   # open a SQL shell
```

#### Option B — Native PostgreSQL

1. Make sure the Postgres service is running (it usually starts automatically after install).
2. Open a SQL shell as the default superuser:
   ```bash
   psql -U postgres
   ```
3. Create the user and database (match `.env`):
   ```sql
   CREATE USER your_db_user WITH PASSWORD 'your_db_password';
   CREATE DATABASE "express-crud" OWNER your_db_user;
   GRANT ALL PRIVILEGES ON DATABASE "express-crud" TO your_db_user;
   \q
   ```
   *(Or do the same via pgAdmin: right-click **Login/Group Roles → Create**, then **Databases → Create**.)*

### 5. Verify the database connection (optional but reassuring)

```bash
psql "postgresql://your_db_user:your_db_password@localhost:5432/express-crud" -c "SELECT 1;"
```

Expect a small table printing `1`. If this fails, fix it **before** running the app — see [Troubleshooting](#troubleshooting).

### 6. Run the dev server

```bash
npm run dev
```

Expected output:

```
Server is running on http://localhost:5001
```

### 7. Confirm it's alive

Open http://localhost:5001 in a browser, or:

```bash
curl http://localhost:5001
```

Right now there are no routes yet, so a `404 Cannot GET /` response is **normal** — it still means Express is up.

---

## Troubleshooting

| Symptom | Cause & fix |
| --- | --- |
| `ECONNREFUSED 127.0.0.1:5432` | Postgres isn't running / wrong `DB_PORT`. Start the container (`docker start express-crud-pg`) or the service. |
| `password authentication failed for user "..."` | `DB_USER` / `DB_PASSWORD` in `.env` don't match what Postgres has. Recreate the user or fix `.env`. |
| `database "express-crud" does not exist` | You skipped creating the DB (step 4). Create it, or with Docker add `-e POSTGRES_DB=express-crud` and recreate the container. |
| `EADDRINUSE :::5001` | Port 5001 is taken. Change `PORT` in `.env`, or kill the other process. |
| `TypeError: cors is not a function` | You're on old code — `src/index.js` must call `app.use(cors())` (with parentheses). |
| `.env` values are `undefined` | `dotenv.config()` must run before anything reads `process.env`. It's the first thing in `src/index.js`. |
| Docker: `port is already allocated` | Another Postgres already uses 5432. Stop it, or map a different host port: `-p 5433:5432` and set `DB_PORT=5433`. |

---

## Project structure

```
src/
├── config/        # db.js — PostgreSQL connection pool
├── controllers/   # route handlers / business logic        (to be added)
├── data/          # SQL queries / DB access, seed data      (to be added)
├── middlewares/   # error handling, validation, auth        (to be added)
├── models/        # table structure / entity definitions    (to be added)
├── routes/        # endpoint paths -> controllers mapping   (to be added)
└── index.js       # app entry: Express app, middlewares, mount routes, listen
```

---

## Environment variables

| Variable | Example | Description |
| --- | --- | --- |
| `PORT` | `5001` | Port the Express server listens on |
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_USER` | `your_db_user` | PostgreSQL username |
| `DB_PASSWORD` | `your_db_password` | PostgreSQL password |
| `DB_NAME` | `express-crud` | Database name used by this app |

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start with nodemon (auto-reload on file changes) |

---

## Status / roadmap

- [x] Express app bootstrap + JSON & CORS middleware
- [x] PostgreSQL connection pool (`src/config/db.js`)
- [ ] Database schema / migration for the CRUD resource
- [ ] Routes → controllers → data layer
- [ ] Joi request validation middleware
- [ ] Central error-handling middleware
- [ ] API endpoint documentation
