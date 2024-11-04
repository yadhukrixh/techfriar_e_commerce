import axios from "axios";
import { ProductData } from "../components/product-list/product-list";

export const fetchProductList = async(setProductList:(list:ProductData[])=>void) => {
    try{
        const response = await axios.get("http://localhost:4000/products/fetchAllProducts")
        if(response.data.status){
            setProductList(response.data.data);
            console.log(response.data.data);
        }
    }catch(error){
        console.error(error)
    }
}