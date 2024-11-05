"use client";
import React, { useEffect, useState } from "react";
import "./product-list.css";
import QuantitySelector from "@/modules/common/quantity-selector/quantity-selector";
import ProductCard from "../product-card/product-card";
import { CartData } from "../../views";

interface ProductListProps {
  cartList: CartData[];
}

const ProductList: React.FC<ProductListProps> = ({ cartList }) => {
  useEffect(() => {}, []);

  return (
    <div className="product-list">
        {cartList.map((data) => {
          return <ProductCard productData={data}/>;
        })}

    </div>
  );
};

export default ProductList;
