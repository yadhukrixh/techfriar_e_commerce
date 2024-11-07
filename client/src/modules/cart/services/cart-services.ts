import axios from "axios";
import { CartData } from "../views";
import Swal from "sweetalert2";
import { message } from "antd";

export interface PriceAndOffers {
    productId: string;
    totalAmountPerItem: number;
    count: number;
    productName: string;
    offers: [string];
}

export interface CartMainData {
    cartOffers: [string];
    totalPrice: number;
    totalPayableAmount: number;
    discount: number;
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
export const fetchPriceAndOffers = async (setPriceDetails: (data: PriceAndOffers[]) => void, setMainCartData: (data: CartMainData) => void) => {
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
    setPriceDetails(response.data.data.priceDataList);
    const data: CartMainData = {
        cartOffers: response.data.data.cartOffers,
        totalPrice: response.data.data.totalPrice,
        totalPayableAmount: response.data.data.totalPayableAmount,
        discount: response.data.data.discount
    }

    setMainCartData(data);
}

// delete product from cart
export const deleteProductFromCart = async (productId: string, setShowCard: (status: boolean) => void, ) => {
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

    const response = await axios.post('http://localhost:4000/products/deleteProductsFromCart', { userId, productId });
    if (response.data.status) {
        Swal.fire({
            title: "Success!",
            text: "Deletion successfull",
            icon: "success"
        });
        setShowCard(false);
    }
    else{
        Swal.fire({
            title: "Failed!",
            text: "Deletion Failed",
            icon: "error"
        });
    }
}

// sbtract count of product
export const subtractCartProductCount = async (productId:string) => {
    try{
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

        const response = await axios.post('http://localhost:4000/products/decreaseProductCountFromcart',{userId,productId});
        console.log(response)
        if(response.data.status){
            Swal.fire({
                title: "Success!",
                text: "Count Updated",
                icon: "success"
            });
        }
    }catch(error){
        console.error(error)
    }
}