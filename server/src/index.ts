import "dotenv/config";
import express from "express";
import cors from "cors";
import { addCartLine, createCart, getProducts, isShopifyConfigured } from "./shopify.js";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

/* ------------------------------------------------------------------ */
/* Shopify                                                              */
/* ------------------------------------------------------------------ */

app.get("/api/shopify/status", (_req, res) => {
  res.json({ configured: isShopifyConfigured() });
});

app.get("/api/shopify/products", async (req, res) => {
  if (!isShopifyConfigured()) {
    res.status(503).json({ error: "Shopify is not configured on this server yet." });
    return;
  }
  try {
    const first = Number(req.query.first) || 12;
    const products = await getProducts(first);
    res.json(products);
  } catch (err) {
    res.status(502).json({ error: err instanceof Error ? err.message : "Shopify request failed" });
  }
});

app.post("/api/shopify/cart", async (req, res) => {
  if (!isShopifyConfigured()) {
    res.status(503).json({ error: "Shopify is not configured on this server yet." });
    return;
  }
  const { merchandiseId, quantity } = req.body ?? {};
  if (typeof merchandiseId !== "string" || !merchandiseId) {
    res.status(400).json({ error: "merchandiseId is required" });
    return;
  }
  try {
    const cart = await createCart(merchandiseId, Number(quantity) || 1);
    res.status(201).json(cart);
  } catch (err) {
    res.status(502).json({ error: err instanceof Error ? err.message : "Shopify request failed" });
  }
});

app.post("/api/shopify/cart/:cartId/lines", async (req, res) => {
  if (!isShopifyConfigured()) {
    res.status(503).json({ error: "Shopify is not configured on this server yet." });
    return;
  }
  const { merchandiseId, quantity } = req.body ?? {};
  if (typeof merchandiseId !== "string" || !merchandiseId) {
    res.status(400).json({ error: "merchandiseId is required" });
    return;
  }
  try {
    const cart = await addCartLine(req.params.cartId, merchandiseId, Number(quantity) || 1);
    res.json(cart);
  } catch (err) {
    res.status(502).json({ error: err instanceof Error ? err.message : "Shopify request failed" });
  }
});

app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from the VintageBlue API!", timestamp: new Date().toISOString() });
});

// Example in-memory resource to build on
interface Item {
  id: number;
  name: string;
}

let nextId = 3;
const items: Item[] = [
  { id: 1, name: "First item" },
  { id: 2, name: "Second item" },
];

app.get("/api/items", (_req, res) => {
  res.json(items);
});

app.post("/api/items", (req, res) => {
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  if (!name) {
    res.status(400).json({ error: "name is required" });
    return;
  }
  const item: Item = { id: nextId++, name };
  items.push(item);
  res.status(201).json(item);
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
