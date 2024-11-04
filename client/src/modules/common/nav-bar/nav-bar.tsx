"use client"
import React, { useState } from "react";
import styles from "./nav-bar.module.css";

const NavBar = () => {
    const [showTopBanner,setShowTopBanner] = useState(true);
    const handleClose = () => {
        setShowTopBanner(false)
    }

  return (
    <>
    {showTopBanner &&
      <div className={styles.topBanner}>
        Sign up and get 20% off on your first order. <a href="#">Sign Up Now</a>
        <span className={styles.closeBanner} onClick={handleClose}>&times;</span>
      </div>
    }
      <div className={styles.navBarWrapper}>
        <div className={styles.logo}>Scentora</div>

        <ul className={styles.navLinks}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">New Arrivals</a>
          </li>
          <li>
            <a href="#">Brands</a>
          </li>
        </ul>

        <div className={styles.searchBar}>
          <input type="text" placeholder="Search for products..." />
          <span className={styles.searchIcon}>
            <img src="/icons/search-icon.png" alt="" />
          </span>
        </div>

        <div className={styles.icons}>
          <div className={styles.icon}>
            <span>
              <img src="/icons/Vector.png" alt="" />
            </span>
            <span className={styles.badge}>2</span>
          </div>
          <a href="../cart/cart.html">
            <div className={styles.icon}>
              <span>
                <img src="/icons/Cart1.png" alt="" />
              </span>
              <span className={styles.badge}>4</span>
            </div>
          </a>
          <div className={styles.icon}>
            <span>
              <img src="/icons/person.png" alt="" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
