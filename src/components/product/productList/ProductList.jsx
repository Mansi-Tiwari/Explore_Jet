import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import { BsGrid3X3Gap } from "react-icons/bs";
import { TfiLayoutListThumbAlt } from "react-icons/tfi";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
  SORT_PRODUCTS,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../pagination/Pagination";
import { NavLink } from "react-router-dom";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredProducts = useSelector(selectFilteredProducts);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  return (
    <div className={`mb-7 ${styles["product-list"]} `} id="product">
      <div className={styles.top}>
        <div className={`mx-3 gap-6 ${styles.icons}`}>
          <BsGrid3X3Gap
            size={22}
            color="#0a1930"
            onClick={() => setGrid(true)}
            className="mx-4 "
          />

          <TfiLayoutListThumbAlt
            size={24}
            color="#0a1930"
            onClick={() => setGrid(false)}
          />

          <p>
            <b>{filteredProducts.length}</b> Products found.
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {currentProducts.length !== 0 ? (
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        ) : (
          <div>
            <div className="h-[500px] mt-80 text-4xl">
             Hmm, Looks like we don't have match for "{search}".
            <p className="mt-3">
              If you still can't find what you're looking for,
              <span className="text-teal-500 font-bold">
              <NavLink to={'/contact'}>

              send feedback
              </NavLink>
              </span>
              to help Improve our site.
            </p>
            </div>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  );
};

export default ProductList;
