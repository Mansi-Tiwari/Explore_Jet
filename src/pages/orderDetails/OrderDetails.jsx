import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImg from "../../assets/spinner.jpg";
import styles from "./OrderDetails.module.scss";
const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2 className="text-4xl font-semibold mb-10">Order Details</h2>
        <Link to="/order-history">
          <div className="border-2 w-80 p-2 mb-10 bg-gray-100">
            &larr; Back To Orders
          </div>
        </Link>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Order Amount:</strong> ${order.orderAmount}
            </p>
            <p>
              <strong>Order Status:</strong> {order.orderStatus}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>Product</th>

                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        {" "}
                        <p>
                          <strong>{name}</strong>
                        </p>
                      </td>
                      <td>₹{price}</td>
                      <td>{cartQuantity}</td>
                      <td>₹{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <Link to={`/review-product/${id}`}>
                          <button className="--btn bg-black text-white">
                            Review Product
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;
