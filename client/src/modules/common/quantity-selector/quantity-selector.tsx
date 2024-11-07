"use client";
import React from 'react';
import styles from './quantity-selector.module.css';
import { Button, InputNumber } from 'antd';

interface QuantitySelectorProps {
  minimum:number;
  quantity: number;
  setQuantity: (value: number) => void; // expects number only
  updationValue:number;
  addFunction:()=>void;
  removeFunction:()=>void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ minimum , quantity, setQuantity, updationValue,addFunction,removeFunction }) => {
  const handleIncrement = () => {
    setQuantity(quantity ? quantity + (updationValue) : quantity);
    addFunction();
  };

  const handleDecrement = () => {
    setQuantity(quantity && quantity >minimum ? quantity - (updationValue) : quantity);
    removeFunction();
  };

  const handleChange = (value: number | null) => {
    if (value !== null) {
      setQuantity(value); // Only setQuantity if value is not null
    }
  };

  return (
    <div className={styles.quantitySelector}>
      <Button onClick={handleDecrement} disabled={!quantity || quantity <= minimum} style={{color:"black"}}>
        -
      </Button>
      <InputNumber
        min={minimum}
        value={quantity}
        onChange={handleChange} // Use handleChange to handle null
        className={styles.numberSelectorInput}
        style={{ width: '60px', margin: '0 8px' }}
        type='number'
        readOnly={true}
      />
      <Button onClick={handleIncrement}>+</Button>
    </div>
  );
};

export default QuantitySelector;
