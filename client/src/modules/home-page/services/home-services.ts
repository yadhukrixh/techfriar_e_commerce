import axios from "axios";
import { ProductData } from "../components/product-list/product-list";
import Swal from "sweetalert2";

export const fetchProductList = async (setProductList: (list: ProductData[]) => void) => {
    try {
        const response = await axios.get("http://localhost:4000/products/fetchAllProducts")
        if (response.data.status) {
            setProductList(response.data.data);
        }
    } catch (error) {
        console.error(error)
    }
}

// add to cart
export const addTocart = async (productId: string) => {
    try {

        let userId;
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            // Remove leading spaces
            cookie = cookie.trim();
            if (cookie.startsWith('userToken')) {
                // Return the value after the equal sign
                userId = (cookie.split('=')[1] || null);
            }
        }

        const response = await axios.post("http://localhost:4000/products/addToCart", { userId, productId });
        if (response.data.status) {
            Swal.fire({
                title: "Success!",
                text: "Product added to cart!",
                icon: "success"
            });
        } else {
            Swal.fire({
                title: "Failed!",
                text: "Failed to add to cart!",
                icon: "error"
            });
        }
    } catch (error) {
        console.error(error)
    }
}