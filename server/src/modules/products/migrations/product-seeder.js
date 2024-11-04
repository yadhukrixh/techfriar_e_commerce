import { productsData } from "../../../data/products.js";
import Products from "../models/product-model.js"
import { seedProduct } from "../repository/product-repo.js";

export const productSeeder = async() => {
    const products = await Products.find();
    const productsToUpload = productsData.filter((product) => !products.includes(product));
    if(productsToUpload.length > 0){
        seedProduct(productsToUpload)
    }
}