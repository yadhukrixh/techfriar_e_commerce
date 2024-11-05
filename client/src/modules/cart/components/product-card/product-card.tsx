import QuantitySelector from "@/modules/common/quantity-selector/quantity-selector";
import React, { useState } from "react";
import './product-card.css'
import { CartData } from "../../views";

interface ProductCardProps{
    productData:CartData
}

const ProductCard:React.FC<ProductCardProps> = ({productData}) => {
    const [quantity,setQuantity] = useState(1);
    const totalPrice = 0;

    const aFunction = () => {
        console.log("")
    }
  return (
    <div className="product-item">
      <img src={productData.image} alt="" />
      <div className="product-details">
        <div>
          <h3>{productData.name}</h3>
        </div>
        <p>{productData.description}</p>
        <p className="price">${totalPrice}</p>
        <div className="pop">
          <p className="offer" onClick={aFunction}>
            1 Offers Available
            <span className="offer-image">
              <img src="icons/iemo.png" alt="" />
            </span>
          </p>
          <div className="offer-popup" id="Popup">
            <p>
              <strong>Offers Applied</strong>
            </p>
            <p>Buy 1 Get 1 Free</p>
            <button onClick={aFunction}>Close</button>
          </div>
        </div>
        <QuantitySelector
          minimum={1}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>
      <div className="product-actions">
        <span className="wishlist-icon">
          <img className="wishlist-icon" src="icons/delete.png" alt="" />
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
