# Simple CQRS Backend (Node.js + TypeScript + Mongoose)

A minimal **learning project** for CQRS using:
- Node.js + Express
- TypeScript
- Mongoose
- Two MongoDB databases on the same Atlas cluster:
  - **write DB**: command side
  - **read DB**: query side

## CQRS Idea (Simple)

- `POST /commands/products` writes into the **write model** (`cqrs_write.products`)
- After write, a small projector syncs data into the **read model** (`cqrs_read.products_read`)
- `GET /queries/products` and `GET /queries/products/:id` read only from the read DB

This keeps command and query responsibilities separated in a beginner-friendly way.

## 1) Setup

```bash
npm install
cp .env.example .env
```

`.env` values (already aligned to your provided connection string):

```env
PORT=4000
MONGODB_URI=mongodb+srv://dev:hBlkdcjq8v5hhYPl@cluster0.oofzv.mongodb.net/cqrs1
WRITE_DB_NAME=cqrs_write
READ_DB_NAME=cqrs_read
```

## 2) Run

```bash
npm run dev
```

Build + run production build:

```bash
npm run build
npm start
```

## 3) API Examples

Create product (Command side):

```bash
curl -X POST http://localhost:4000/commands/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Keyboard","price":99.9}'
```

Get all products (Query side):

```bash
curl http://localhost:4000/queries/products
```

Get one product by id (Query side):

```bash
curl http://localhost:4000/queries/products/<PRODUCT_ID>
```

Health check:

```bash
curl http://localhost:4000/health
```

## 4) Folder Structure

```text
src/
  app.ts
  server.ts
  config/
    env.ts
    database.ts
  write/
    models/
      product-write.model.ts
    repositories/
      product-write.repository.ts
    commands/
      create-product.command.ts
    routes/
      command.routes.ts
  read/
    models/
      product-read.model.ts
    repositories/
      product-read.repository.ts
    queries/
      get-all-products.query.ts
      get-product-by-id.query.ts
    routes/
      query.routes.ts
  sync/
    product-projector.ts
  shared/
    http-errors.ts
    validate-create-product.ts
    types.ts
```

## 5) Learning Notes

- This sample uses **same Atlas cluster, different database names** for simplicity.
- Projection here is synchronous after write (easy to understand).
- In real systems, projection is often async/event-driven (eventual consistency).
