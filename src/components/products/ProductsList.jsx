import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Loader from "../loader/Loader";
const Listitem = ({ name, price, image, id }) => {
  const [fav, setFav] = useState(true);
  const handleClick = () => {
    setFav(!fav);
  };
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  return (
    <div className="flex items-start justify-center flex-col gap-5 ">
      <NavLink to={`/product-details/${id}`}>
        <img className="h-100 w-80 object-cover" src={image} alt="hii" />
        <p className="font-bold">{shortenText(name, 12)}</p>
      </NavLink>
      <div className="flex items-center gap-[130px] flex-row ">
        <p>₹{price.toLocaleString()}</p>
        <p onClick={handleClick}>
          {fav ? <AiOutlineHeart size={20} /> : <AiFillHeart size={20} />}
        </p>
      </div>
    </div>
  );
};
const ProductsList = () => {
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const currentProducts1 = products.slice(15, 20);
  const currentProducts2 = products.slice(10, 15);
  const currentProducts3 = products.slice(5, 10);
  const currentProducts4 = products.slice(0, 5);

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <div className={`container ${styles.product}`}>
      {isLoading && <Loader />}
      <h1 className="text-4xl font-semibold my-[60px]">Feature Products</h1>
      <h2 className="text-4xl mb-10">Up to 20% off | Styles for Men Fashion</h2>
      <div className="flex-wrap flex gap-20 items-center justify-center mb-20 ">
        {currentProducts1.length !== 0 &&
          currentProducts1.map((product) => {
            return (
              <div key={product.id}>
                <Listitem
                  {...product}
                  image={product.imageURL}
                  name={product.name}
                  price={product.price}
                  id={product.id}
                />
              </div>
            );
          })}
      </div>
      <h2 className="text-4xl mb-10">Bestsellers in Women's Indian Clothing</h2>
      <div className="flex-wrap flex gap-20 items-center justify-center mb-20 ">
        {currentProducts2.length !== 0 &&
          currentProducts2.map((product) => {
            return (
              <div key={product.id}>
                <Listitem
                  {...product}
                  image={product.imageURL}
                  name={product.name}
                  price={product.price}
                  id={product.id}
                />
              </div>
            );
          })}
      </div>
      <h2 className="text-4xl mb-10">Customers Most-Loved Fashion for you</h2>
      <div className="flex-wrap flex gap-20 items-center justify-center mb-20 ">
        {currentProducts3.length !== 0 &&
          currentProducts3.map((product) => {
            return (
              <div key={product.id}>
                <Listitem
                  {...product}
                  image={product.imageURL}
                  name={product.name}
                  price={product.price}
                  id={product.id}
                />
              </div>
            );
          })}
      </div>
      <h2 className="text-4xl mb-10">SmartBuy Live | Watch & Shop LIVE</h2>

      <div className="flex-wrap flex gap-20 items-center justify-center mb-20 ">
        {currentProducts4.length !== 0 &&
          currentProducts4.map((product) => {
            return (
              <div key={product.id}>
                <Listitem
                  {...product}
                  image={product.imageURL}
                  name={product.name}
                  price={product.price}
                  id={product.id}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductsList;
