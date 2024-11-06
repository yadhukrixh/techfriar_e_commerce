import { offersData } from "../../../data/offers.js";
import { ordersData } from "../../../data/orders.js";
import { productsData } from "../../../data/products.js";
import Offers from "../models/offers.js";
import Order from "../models/ordres.js";
import Products from "../models/product-model.js"
import { seedProduct } from "../repository/product-repo.js";

//product seeding
export const productSeeder = async() => {
    const products = await Products.find();
    const productsToUpload = productsData.filter((product) => !products.includes(product));
    if(productsToUpload.length > 0){
        seedProduct(productsToUpload)
    }
}


// offer seeder
export const offerSeeder = async() => {
    offersData.map(async(offer)=>{
        const offerSeed = new Offers({
            name:offer.name
        });
        await offerSeed.save();
    })
}

// orders seeder
export const orderSeeder = async() => {
    ordersData.map(async(order)=>{
        const orderDoc = new Order({
            userId:order.userId,
            totalAmount:order.totalAmount,
            discountedAmount:order.discountedAmount,
            payableAmount:order.payableAmount,
            productIds:order.productIds,
            offerIds:order.offerIds,
            status:order.status
        })
        await orderDoc.save()
    })
}