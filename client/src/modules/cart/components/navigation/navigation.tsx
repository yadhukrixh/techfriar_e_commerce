import React from 'react'
import './navigation.css'

interface PageProps{
    productCount:number;
}
const Navigation:React.FC<PageProps> = ({productCount}) => {
  return (
    <div>
        <section className="breadcrumb-section">
    <div className="breadcrumb"><a href="">Home </a> - <a href="">Cart</a></div>
  </section>

  <div className="product-count">
    <h2>{productCount} Items</h2>
  </div>
    </div>
  )
}

export default Navigation;
