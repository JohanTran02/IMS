import express from "express";
import { deleteProduct, getProductById, getProducts, postProduct, updateProduct } from "./products.controller";
const router = express.Router();



router.get("/api/products/:id", getProductById);
router.get("/api/products", getProducts);
router.post("/api/product", postProduct);
router.put("/api/product/:id", updateProduct);
router.delete("/api/product/:id", deleteProduct);

export default router;