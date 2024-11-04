"use client";
import React, { useEffect, useState } from "react";
import "./product-list.css";
import { fetchProductList } from "../../services/home-services";

export interface ProductData {
  name: string;
  image: string;
  description: string;
  price: number;
}

const ProductList = () => {
  const [productList, setProductList] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      await fetchProductList(setProductList);
    };
    fetchProducts();
  }, []);

  return (
    <div className="collection-right">
      <div className="our-collections">Our Collections</div>
      <div className="results-info">
        <div className="results-count">Showing 06 results</div>
        <div className="sort-by">
          <span>
            Sorted by : <b>Popularity</b>
            <img className="mt-50" src="../img/down-arrow.svg" alt="" />
          </span>
        </div>
      </div>

      <div className="class-card">
        {productList.map((product) => {
          return (
            <div className="product-card">
              <div className="text-center image-wrap">
                <div className="image-block">
                  <img
                    src={product.image}
                    alt="Product"
                    className="product-image"
                  />
                </div>
                <div className="heart-wrapper">
                  <img
                    src="icons/heart.svg"
                    alt="Heart"
                    className="heart-image"
                  />
                </div>

                <div className="badge-wrapper">
                  <img
                    src="icons/badge.svg"
                    alt="Heart"
                    className="badge-wrapper"
                  />
                </div>
              </div>

              <div className="details-block">
                <div className="head-1">{product.name}</div>
                <p className="sub-head-1">{product.description}</p>
                <p className="price">$ {product.price}</p>
                <a href="../cart/cart.html">
                  <button className="buy-button">Add to Cart</button>
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ProductList;
