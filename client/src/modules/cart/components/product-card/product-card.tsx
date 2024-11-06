import QuantitySelector from "@/modules/common/quantity-selector/quantity-selector";
import React, { useEffect, useState } from "react";
import "./product-card.css";
import { CartData } from "../../views";
import { deleteProductFromCart, PriceAndOffers } from "../../services/cart-services";

interface ProductCardProps {
  productData: CartData;
  priceList: PriceAndOffers[];
  triggerFlag:boolean;
  setTriggerFlag:(status:boolean)=>void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productData,
  priceList,
  triggerFlag,
  setTriggerFlag
}) => {
  const [priceData, setPriceData] = useState<PriceAndOffers>();
  const [quantity, setQuantity] = useState(priceData?.count);
  const [offerPopup, setOfferPopup] = useState(false);
  const [showCard,setShowcard] = useState(true)

  useEffect(() => {
    for (const i of priceList) {
      if (i.productId === productData.productId) {
        setPriceData(i);
      }
    }
  }, [priceList]);

  useEffect(()=>{
    setTriggerFlag(!triggerFlag)
  },[showCard])

  const aFunction = () => {
    setOfferPopup(!offerPopup);
  };

  return (
    <>{showCard &&
        <div className="product-item">
        <img className="product-image" src={productData.image} alt="" />
        <div className="product-details">
            <div>
            <h3>{productData.name}</h3>
            </div>
            <p>{productData.description}</p>
            <p className="price">${priceData?.totalAmountPerItem}</p>
            <div className="pop">
            <p className="offer" onClick={aFunction}>
                {priceData?.offers.length} Offers Available
                <span className="offer-image">
                <img src="icons/iemo.png" alt="" />
                </span>
            </p>
            {offerPopup && (
                <div className="offer-popup" id="Popup">
                <p>
                    <strong>Offers Applied</strong>
                </p>
                {priceData?.offers.map((offer) => {
                    return (
                    <>
                        <p>{offer}</p>
                    </>
                    );
                })}

                <button onClick={aFunction}>Close</button>
                </div>
            )}
            </div>
            <QuantitySelector
            minimum={1}
            quantity={priceData?.count ? priceData.count : 1}
            setQuantity={setQuantity}
            />
        </div>
        <div className="product-actions" onClick={()=>{deleteProductFromCart(productData.productId,setShowcard)}}>
            <span className="wishlist-icon">
            <img className="wishlist-icon" src="icons/delete.png" alt="" />
            </span>
        </div>
        </div>
    }</>
  );
};

export default ProductCard;
