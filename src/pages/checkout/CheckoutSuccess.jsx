import { Link } from "react-router-dom";
import Confetti from 'react-confetti';

const CheckoutSuccess = () => {

  return (
    <section className="">
      <Confetti recycle={false}></Confetti>
      <div className="container">
        <h2 className="font-bold text-3xl mb-10 md:text-4xl">Checkout Successful</h2>
        <p className="text-3xl">Thank you for your purchase🎉😊.</p>
        <br />

        <button className="--btn bg-black text-white">
          <Link to="/order-history">View Order Status</Link>
        </button>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
