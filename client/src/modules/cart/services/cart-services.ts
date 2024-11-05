import axios from "axios";
import { CartData } from "../views";

export interface PriceAndOffers {
    productId: string;
    totalAmount: number;
    offers: [string];
}

// fetch product details
export const fetchProductsOncart = async (setcartlist: (data: CartData[]) => void) => {
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
        const response = await axios.post('http://localhost:4000/products/fetchProductsOnCart', { userId });
        setcartlist(response.data.data)
    } catch (error) {
        console.error(error)
    }
}

// fetch amount per item
export const fetchPriceAndOffers = async (setPriceDetails: (list: PriceAndOffers[]) => void) => {
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

    const response = await axios.post('http://localhost:4000/products/fetchPriceAndOffers', { userId });
}