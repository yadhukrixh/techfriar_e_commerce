import QuantitySelector from "@/modules/common/quantity-selector/quantity-selector";
import React, { useEffect, useState } from "react";
import "./product-card.css";
import { CartData } from "../../views";
import { deleteProductFromCart, PriceAndOffers, subtractCartProductCount } from "../../services/cart-services";
import { addTocart } from "@/modules/home-page/services/home-services";

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
  const [quantity, setQuantity] = useState(1);
  const [offerPopup, setOfferPopup] = useState(false);
  const [showCard,setShowcard] = useState(true);
  const [updationValue,setUpdationValue] = useState<number>(1);

  // price card data setup
  useEffect(() => {
    for (const i of priceList) {
      if (i.productId === productData.productId) {
        setPriceData(i);
        setQuantity(i.count);
        if(i.productName === 'DAVIDOFF'){
          setUpdationValue(2);
        }else{
          setUpdationValue(1);
        }
      }
    }
  }, [priceList]);

  // triggerflag setup to trigger the ftching on value updation
  useEffect(()=>{
    setTriggerFlag(!triggerFlag)
  },[showCard,quantity])

  // handle value updation on the 
  const handleAddProductCount = async() => {
    await addTocart(productData.productId);
  }

  const handleRemoveProductCount = async() => {
    await subtractCartProductCount(productData.productId);
  }

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
            <p className="price">${priceData?.totalAmountPerItem.toFixed(3)}</p>
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
            minimum={updationValue}
            quantity={quantity}
            setQuantity={setQuantity}
            updationValue={updationValue}
            addFunction={handleAddProductCount}
            removeFunction={handleRemoveProductCount}

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
