# Web Crawler Test Task

This project contains a simple full-stack application written in Go (backend) and React/TypeScript (frontend).

## Prerequisites

- Go 1.20+
- Node.js 18+
- MySQL

## Setup

1. **Database**

   Create database `webcrawler` and apply the migration:

   ```sql
   CREATE DATABASE webcrawler;
   USE webcrawler;
   source backend/migrations/001_init.sql;
   ```

2. **Backend**

   ```bash
   cd backend
   go mod tidy   # may require internet access
   go run main.go
   ```

   The server listens on `:8080`.

3. **Frontend**

   ```bash
   cd frontend
   npm install   # requires internet access
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

## Tests

Run front-end tests:

```bash
cd frontend
npm test
```

## API

All requests must include header `Authorization: secret-token`.

- `POST /api/urls` – body `{"address": "https://example.com"}`
- `GET /api/urls` – list URLs
- `GET /api/urls/:id` – detail
- `DELETE /api/urls/:id` – delete
- `POST /api/urls/:id/restart` – re-crawl

