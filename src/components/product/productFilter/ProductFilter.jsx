import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../../redux/slice/productSlice";
import styles from "./ProductFilter.module.scss";

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(3000);
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];
  // console.log(allBrands);

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };

  return (<>
    <div className={`px-8 py-5 border  ${styles.filter}`}>
      <h4 className="text-2xl font-bold mb-8">Categories</h4>
      <div className={`${styles.category} mb-10`}>
        {allCategories.map((cat, index) => {
          return (
            <button
            key={index}
            type="button"
            className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterProducts(cat)}
              >
              &#10095; {cat}
            </button>
          );
        })}
      </div>
      <h4 className="text-2xl font-bold mb-4">Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)} className="mb-10">
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}  >
                {brand}
              </option>
            );
          })}
        </select>
        <h4 className="text-2xl font-bold mb-3">Price</h4>
        <p  className="font-bold">{`₹${price.toLocaleString()}`}</p>
        <div className={`mb-[70px] ${styles.price}`}>
          <input
            type="range"
            value={price.toLocaleString()}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            id="myinput"
            max={maxPrice}
          className="h-2 bg-gray-100 rounded-lg appearance-none fill-current cursor-pointer dark:bg-gray-700"
          />
        </div>
        <br />
        <button className="--btn border shadow-xl text-gray-600 border-slate-400 hover:bg-slate-400 hover:text-white" onClick={clearFilters}>
          Clear Filter
        </button>
      </div>
    </div>
            </>
  );
};

export default ProductFilter;
