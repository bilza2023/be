// src/utils/createCrudRouter.js
import express from "express";

export function createCrudRouter({ model, schema, basePath, routes = { get: true, post: true, put: true, delete: true } }) {
  const router = express.Router();

  if (routes.get) {
    // GET /items
    router.get(`${basePath}`, async (req, res) => {
      try {
        const filters = {};

        for (const [key, value] of Object.entries(req.query)) {
          if (key.endsWith("_ne")) {
            filters[key.replace("_ne", "")] = { not: value };
          } else if (key.endsWith("_gt")) {
            filters[key.replace("_gt", "")] = { gt: parseValue(value) };
          } else if (key.endsWith("_lt")) {
            filters[key.replace("_lt", "")] = { lt: parseValue(value) };
          } else if (key.endsWith("_gte")) {
            filters[key.replace("_gte", "")] = { gte: parseValue(value) };
          } else if (key.endsWith("_lte")) {
            filters[key.replace("_lte", "")] = { lte: parseValue(value) };
          } else if (key.endsWith("_contains")) {
            filters[key.replace("_contains", "")] = { contains: value, mode: "insensitive" };
          } else if (key.endsWith("_in")) {
            filters[key.replace("_in", "")] = { in: value.split(",") };
          } else {
            filters[key] = value;
          }
        }

        const items = await model.findMany({ where: filters });
        res.json(items);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch records." });
      }
    });

    // GET /items/:id
    router.get(`${basePath}/:id`, async (req, res) => {
      try {
        const item = await model.findUnique({
          where: { id: parseInt(req.params.id, 10) },
        });
        if (!item) return res.status(404).json({ error: "Not found" });
        res.json(item);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch record." });
      }
    });
  }

  if (routes.post) {
    // POST /items
    router.post(`${basePath}`, async (req, res) => {
      try {
        const parsed = schema.parse(req.body);
        const created = await model.create({ data: parsed });
        res.status(201).json(created);
      } catch (err) {
        res.status(400).json({ error: "Validation or creation failed", details: err });
      }
    });
  }

  if (routes.put) {
    // PUT /items/:id
    router.put(`${basePath}/:id`, async (req, res) => {
      try {
        const parsed = schema.parse(req.body);
        const updated = await model.update({
          where: { id: parseInt(req.params.id, 10) },
          data: parsed,
        });
        res.json(updated);
      } catch (err) {
        res.status(400).json({ error: "Update failed", details: err });
      }
    });
  }

  if (routes.delete) {
    // DELETE /items/:id
    router.delete(`${basePath}/:id`, async (req, res) => {
      try {
        await model.delete({ where: { id: parseInt(req.params.id, 10) } });
        res.status(204).end();
      } catch (err) {
        res.status(500).json({ error: "Delete failed" });
      }
    });
  }

  return router;
}

// Helper: parse numbers or fall back to string
function parseValue(val) {
  const num = parseFloat(val);
  return isNaN(num) ? val : num;
}

// I Chat GPT swear that I will not add any more code in this file and not make it bloat. Amen. Dated 5Jun2025
// the object structure is nested, but the access is flat+filtered. -> tcodes (table) is the flat representation of a nested book (a book structure)