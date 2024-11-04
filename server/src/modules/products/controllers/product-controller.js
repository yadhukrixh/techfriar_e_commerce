import { fetchAllProductRepo } from "../repository/product-repo.js"

export const fetchAllProducts = async (req,res) => {
    const products = await fetchAllProductRepo()
    res.json({status:true,message:"Products fetched successfully", data:products});
}