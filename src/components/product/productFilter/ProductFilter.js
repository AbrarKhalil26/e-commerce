import React, { useState } from "react";
import styles from "./ProductFilter.module.scss";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";

const ProductFilter = () => {
  const products = useSelector(selectProducts);
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState(3000);


  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>

      <div className={styles.category}>
        {allCategories.map((category, index) => (
          <button
            key={index}
            type="button"
            className={`${category}` === category ? `${styles.active}` : null}
          >
            &#8250; {category}
          </button>
        ))}
      </div>

      <h4>Brands</h4>
      <div className={styles.brand}>{}</div>

      <h4>Price</h4>
      <div className={styles.price}>
        <input
          type="range"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          // min={minPrice}
          // max={maxPrice}
        />
      </div>

      <br/>
      <button>Clear Filter</button>
    </div>
  );
};

export default ProductFilter;
