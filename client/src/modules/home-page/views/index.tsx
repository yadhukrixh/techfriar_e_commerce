import React from 'react';
import Banner from '../components/banner/banner';
import Filter from '../components/filter/filter';
import styles from './home.module.css';
import ProductList from '../components/product-list/product-list';


const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <Banner />
      <div className={styles.mainSection}>
        <Filter/>
        <ProductList />
      </div>
    </div>
  )
}

export default HomePage;
