import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h2>Scentora</h2>
                    <p>
                        We have perfumes that suits your <br />style and which you’re proud.
                    </p>
                    <div className="social-icons">
                        <a href="#"><img src="/icons/twitter.png" alt="" /></a>
                        <a href="#"><img src="/icons/fb2.png" alt="" /></a>
                        <a href="#"><img src="/icons/insta.png" alt="" /></a>
                        <a href="#"><img src="/icons/git.png" alt="" /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <div className="footer-column">
                        <h3>Company</h3>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Features</a></li>
                            <li><a href="#">Works</a></li>
                            <li><a href="#">Career</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Help</h3>
                        <ul>
                            <li><a href="#">Customer Support</a></li>
                            <li><a href="#">Delivery Details</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>FAQ</h3>
                        <ul>
                            <li><a href="#">Account</a></li>
                            <li><a href="#">Manage Deliveries</a></li>
                            <li><a href="#">Orders</a></li>
                            <li><a href="#">Payments</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>Scentora © 2000-2023, All Rights Reserved</p>
                <div className="payment-icons">
                    <img src="/icons/visa.png" alt="Visa" />
                    <img src="/icons/master.png" alt="MasterCard" />
                    <img src="/icons/paypal.png" alt="PayPal" />
                    <img src="/icons/applepay.png" alt="Apple Pay" />
                    <img src="/icons/gpay.png" alt="Google Pay" />
                </div>
            </div>
        </footer>
  )
}

export default Footer
