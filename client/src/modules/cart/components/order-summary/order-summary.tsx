"use client";
import React from 'react';
import './order-summary.css';

const OrderSummary = () => {
    const someFunc = () =>{
        console.log("hello");
    }
  return (
    <div className="order-summary">
      <h3>Order Details</h3>
      <div className="summary-item">
        <span>Bag total</span>
        <span>$1390</span>
      </div>
      <div className="summary-item">
        <span>Discount</span>
        <span className="discount">- $450</span>
      </div>
      <div className="pop">
        <p className="offers-applied" onClick={someFunc}>3 offers Applied <span className="info-icon">i</span></p>


        <div id="offersModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={someFunc}>&times;</span>
            <h4>5 Offers Applied</h4>
            <ul>
              <li><strong>Buy 1 Get 1 <span className="free-label">Free</span></strong></li>
              <li>Buy 3 or More & Pay Just <strong>$75 Each!</strong></li>
              <li>Special Combo: Buy Cool Water + Calvin Klein & Get <strong>$10 Off</strong> on Calvin Klein</li>
              <li>Limited Time Only: <strong>15% Off</strong> When You Buy in the Next 2 Days</li>
              <li>Gucci Deal: Save More When You Buy More! Buy 2 units for <strong>10% off</strong>, or 4+ units for
                <strong>20% off</strong>.</li>
            </ul>
            <div className="total-discount">
              <span>Total Discount</span>
              <span className="discount-amount">- $345</span>
            </div>
          </div>
        </div>
      </div>
      <div className="summary-item total">
        <span>Total</span>
        <span>$940</span>
      </div>
      <p className="congrats-message">
        Congratulations! You've Saved $450 today!
      </p>
      <button className="checkout-btn">Go to Checkout</button>

    </div>
  )
}

export default OrderSummary
