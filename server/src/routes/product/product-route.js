import express from 'express';
import { fetchAllProducts } from '../../modules/products/controllers/product-controller.js';

const router = express.Router();

router.get("/fetchAllProducts",fetchAllProducts)

export default router