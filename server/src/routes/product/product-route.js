import express from 'express';
import { addToCart, fetchAllProducts, fetchPriceAndOffers, fetchProductsOnCart } from '../../modules/products/controllers/product-controller.js';

const router = express.Router();

router.get("/fetchAllProducts",fetchAllProducts)

router.post('/fetchProductsOnCart',fetchProductsOnCart)

router.post("/addToCart",addToCart)

router.post("/fetchPriceAndOffers",fetchPriceAndOffers)

export default router