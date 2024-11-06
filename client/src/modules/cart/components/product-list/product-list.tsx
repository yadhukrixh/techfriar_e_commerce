import React, { useEffect, useState } from "react";
import "./product-list.css";
import ProductCard from "../product-card/product-card";
import { CartData } from "../../views";
import {
  CartMainData,
  fetchPriceAndOffers,
  PriceAndOffers,
} from "../../services/cart-services";

interface ProductListProps {
  cartList: CartData[];
  setMainCartData: (data: CartMainData) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  cartList,
  setMainCartData,
}) => {
  const [priceList, setPriceList] = useState<PriceAndOffers[]>([]);
  const [pricedata, setPricedata] = useState<PriceAndOffers>();

  // fetch priceList offer
  useEffect(() => {
    const fetchPriceOfferList = async () => {
      await fetchPriceAndOffers(setPriceList, setMainCartData);
    };
    fetchPriceOfferList();
  }, []);

  const fetchPriceData = (productId: string) => {
    for (const i of priceList) {
      if (i.productId === productId) {
        setPricedata(i);
      }
    }
  };

  return (
    <div className="product-list">
      {cartList.map((data) => {
        return <ProductCard productData={data} priceList={priceList} />;
      })}
    </div>
  );
};

export default ProductList;
