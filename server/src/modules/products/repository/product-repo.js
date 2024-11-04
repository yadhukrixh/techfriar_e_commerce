import Products from "../models/product-model.js"

// seed product
export const seedProduct = async (products) => {
    products.map(async(product)=>{
        const uploadProduct =new Products({
            name:product.name,
            image:product.image,
            description:product.description,
            price:product.price
        })
        await uploadProduct.save();
    })
}

// fetch all product
export const fetchAllProductRepo = async () => {
    const products = await Products.find();
    return products
}