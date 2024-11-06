"use client";
import React, { useState } from "react";
import "./order-summary.css";
import { CartMainData } from "../../services/cart-services";

interface OrderSummaryProps {
  ordrerSummaryData?: CartMainData;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ ordrerSummaryData }) => {
  const [offers, setOffers] = useState<string[]>([]);
  const [showOffers, setShowOffers] = useState(false);
  const someFunc = () => {
    setOffers(
        ordrerSummaryData?.cartOffers ? ordrerSummaryData.cartOffers : [""]
      )
    setShowOffers(!showOffers)
  };

  return (
    <div className="order-summary">
      <h3>Order Details</h3>
      <div className="summary-item">
        <span>Bag total</span>
        <span>{ordrerSummaryData?.totalPrice}</span>
      </div>
      <div className="summary-item">
        <span>Discount</span>
        <span className="discount">- {ordrerSummaryData?.discount}</span>
      </div>
      <div className="pop">
        <p className="offers-applied" onClick={someFunc}>
          {ordrerSummaryData?.cartOffers
            ? ordrerSummaryData.cartOffers.length
            : 0}{" "}
          offers Applied <span className="info-icon">i</span>
        </p>
        {showOffers && (
          <div id="offersModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={someFunc}>
                &times;
              </span>
              <h4>
                {ordrerSummaryData?.cartOffers
                  ? ordrerSummaryData.cartOffers.length
                  : 0}{" "}
                Offers Applied
              </h4>
              <ul>
                {offers.map((offer) => {
                  return( <li>{offer}</li>);
                })}
              </ul>
              <div className="total-discount">
                <span>Total Discount</span>
                <span className="discount-amount">- ${ordrerSummaryData?.discount}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="summary-item total">
        <span>Total</span>
        <span>${ordrerSummaryData?.totalPayableAmount}</span>
      </div>
      <p className="congrats-message">
        Congratulations! You've Saved ${ordrerSummaryData?.discount} today!
      </p>
      <button className="checkout-btn">Go to Checkout</button>
    </div>
  );
};

export default OrderSummary;
