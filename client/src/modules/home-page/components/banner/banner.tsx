import React from "react";
import styles from './banner.module.css'

const Banner = () => {
  return (
    <div className={styles.exploreBlock}>
      <div className={styles.imageContainer}>
        <img
          src="/icons/img-2.svg"
          alt="Explore Image"
          className={styles.fullWidthImage}
        />
      </div>
    </div>
  );
};

export default Banner;
