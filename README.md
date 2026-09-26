# Mewtracker

Mewtracker is a web tracker for Mewgenics progress. The React interface records class, house boss, and NPC progress; an Express API stores selected cells in MongoDB and calculates completion percentages. A quest page is present as a placeholder.

## Run locally

You need Node.js, npm, and a MongoDB instance or connection string.

1. In `server/`, run `npm ci` and create a `.env` file:

   ```dotenv
   CONNECTION_STRING=mongodb://127.0.0.1:27017/mewtracker
   ```

2. Start the API with `node index.js`. It listens on `http://localhost:3000`.
3. In a second terminal, run `npm ci` and `npm run dev` from `client/`, then open `http://localhost:5173`.

The client currently calls `http://localhost:3000` directly and the API allows the Vite origin `http://localhost:5173`. Change those URLs in source if you use different hosts or ports. Tracker pages use the fixed user ID `thomp-user`; there is no account system yet.

## Layout

- `client/src/pages/`: home and tracker views
- `server/routes/trackerRoutes.js`: read, update, and percentage endpoints
- `server/models/`: MongoDB models for class, house, and NPC cells

Run `npm run lint` or `npm run build` from `client/` when making frontend changes. The server package has no working test script yet.
