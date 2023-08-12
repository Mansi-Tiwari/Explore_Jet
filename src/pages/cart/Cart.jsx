import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import styles from "./Cart.module.scss";
import { BiTrashAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [cartItems, dispatch]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <section>
      <div
        className={
          cartItems.length === 0
            ? `container object-cover bg-center bg-empty bg-no-repeat ${styles.table} h-[600px]`
            : `container ${styles.table} h-[600px]`
        }
      >
        <h2 className="font-bold  text-3xl mb-10">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty. </p>
            <br />
            <Link to="/#products">
              <div className="border-2 hover:bg-gray-100 w-[200px] p-4 hover:font-bold">
                &larr; Continue shopping
              </div>
            </Link>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Product </th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td className={styles.icons}>
                        <BiTrashAlt
                          size={19}
                          color="black"
                          onClick={() => removeFromCart(cart)}
                        />
                      </td>

                      <td>
                        <img
                          src={imageURL}
                          alt={name}
                          className="md:w-[180px]"
                        />
                      </td>
                      <td>
                        {" "}
                        <p>
                          <b>{name}</b>
                        </p>
                      </td>
                      <td>{price.toLocaleString()}</td>
                      <td>
                        <div
                          className={` border p-2 gap-2  w-auto flex items-center justify-center flex-col${styles.count}`}
                        >
                          Quantity &nbsp;
                          <button
                            className="--btn px-4 py-2 border border-gray-300 bg-gray-200"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p className="p-2">
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            className="--btn px-4 py-2 border border-gray-300 bg-gray-200"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className={styles.summary}>
              <button
                className="--btn bg-black text-white h-20 "
                onClick={clearCart}
              >
                Reset Cart
              </button>
              <div className={styles.checkout}>
                <div className="border shadow-md p-3 w-80">
                  <Link to="/#products">&larr; go shopping</Link>
                </div>
                <br />
              </div>
            </div>
            <Card
              cardClass={`md:w-[50%] p-4 mt-10 float-right  ${styles.card}`}
            >
              <p>
                <strong> {`Cart item(s): ${cartTotalQuantity}`}</strong>
              </p>
              <div className="flex justify-between  ">
                <h4 className="font-semibold text-3xl ">Subtotal:</h4>
                <span className="font-semibold text-3xl  ">{`₹${cartTotalAmount.toFixed(
                  2
                )}`}</span>
              </div>
              <p>Tax an shipping calculated at checkout</p>
              <br />
              <div className="border-b"></div>
              <div className="flex justify-between  mt-2 ">
                <h4 className="font-semibold text-2xl ">Total:</h4>
                <span className="font-semibold text-2xl text-teal-500 ">{`₹${cartTotalAmount.toFixed(
                  2
                )}`}</span>
              </div>
              <button
                className="--btn --btn-block mt-10 bg-black text-white"
                onClick={checkout}
              >
                Checkout
              </button>
            </Card>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
