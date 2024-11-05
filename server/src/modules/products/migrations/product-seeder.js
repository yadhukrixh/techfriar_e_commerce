import { offersData } from "../../../data/offers.js";
import { productsData } from "../../../data/products.js";
import Offers from "../models/offers.js";
import Products from "../models/product-model.js"
import { seedProduct } from "../repository/product-repo.js";

export const productSeeder = async() => {
    const products = await Products.find();
    const productsToUpload = productsData.filter((product) => !products.includes(product));
    if(productsToUpload.length > 0){
        seedProduct(productsToUpload)
    }
}

export const offerSeeder = async() => {
    offersData.map(async(offer)=>{
        const offerSeed = new Offers({
            name:offer.name
        });
        await offerSeed.save();
    })
}