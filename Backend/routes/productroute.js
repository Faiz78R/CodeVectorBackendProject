import express from "express"
import { seedProducts,getProducts } from "../controller/productcontroller.js";
const router = express.Router()

// Insert Products

router.post("/seed", seedProducts);

// Get Products

router.get("/", getProducts);

export default router;