"use client";
import React, { useEffect, useState } from "react";
import Navigation from "../components/navigation/navigation";
import ProductList from "../components/product-list/product-list";
import OrderSummary from "../components/order-summary/order-summary";
import { fetchProductsOncart } from "../services/cart-services";

export interface CartData {
  cartId: string;
  productId:string;
  name: string;
  image: string;
  description: string;
}

const Cart = () => {
  const [productList, setProductList] = useState<CartData[]>([]);

  useEffect(()=>{
    const fetchproducts = async () =>{
        await fetchProductsOncart(setProductList);
    }
    fetchproducts();
  },[])
  return (
    <div>
      <Navigation productCount={productList.length} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: "70px",
          paddingRight: "70px",
          paddingTop: "70px",
        }}
      >
        <ProductList cartList={productList} />
        <OrderSummary />
      </div>
    </div>
  );
};

export default Cart;
