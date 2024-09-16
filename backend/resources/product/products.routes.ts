import express from "express";
import { deleteProduct, getProductById, getProducts, postProduct, updateProduct, getStockValue, getStockValueByManufacturer, showLowStock, showCriticalStock, getManufacturers, getProductsbyStockAmount, getProductsbyCategory } from "./products.controller";
const router = express.Router();



router.get("/api/product/:id", getProductById);
router.get("/api/products", getProducts);
router.get("/api/products/stockValue", getStockValue);
router.get("/api/products/lowStock", showLowStock);
router.get("/api/products/criticalStock", showCriticalStock);

router.get("/api/products/stockValueByManufacturer", getStockValueByManufacturer) ;
router.get("/api/products/productByAmount", getProductsbyStockAmount);
router.get("/api/products/productByCategory", getProductsbyCategory);

router.post("/api/product", postProduct);
router.put("/api/product/:id", updateProduct);
router.delete("/api/product/:id", deleteProduct);

router.get("/api/manufacturers", getManufacturers);


export default router;