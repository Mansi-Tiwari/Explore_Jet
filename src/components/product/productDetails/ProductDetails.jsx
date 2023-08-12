import styles from "./ProductDetails.module.scss";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import spinnerImg from "../../../assets/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);
  const cart = cartItems.find((cart) => cart.id === id);
  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2 className="text-4xl font-bold mb-4">Product Details</h2>
        <div className="border p-2 shadow-md w-80">
          <Link to="/products">&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <p>
                  <span className="font-semibold text-teal-500">Brand:</span>{" "}
                  {product.brand}
                </p>
                <h3 className="text-2xl md:text-4xl">{product.name}</h3>
                <p className={styles.price}>
                  <span >Price: </span>
                  {`₹${product.price.toLocaleString()}`}
                </p>
                <p className="mt-4">{product.desc}</p>
                <p>
                  <span className="font-semibold">SKU:</span> {product.id}
                </p>

                <div className={styles.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn px-4 py-2 border bg-gray-300"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn px-4 py-2 border bg-gray-300"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
                <button
                  className="--btn bg-black text-white"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>
                <NavLink to={`/review-product/${id}`}>
                  <button className="--btn bg-black text-white">
                    Add Review
                  </button>
                </NavLink>
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3 className="text-2xl font-semibold">Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div key={index} className={styles.review}>
                      <p>User: {userName}</p>

                      <StarsRating
                        className="text-lg"
                        value={rate}
                        disabled={true}
                      />

                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
