import { useEffect, useState } from "react";
import styles from "./Auth.module.scss";
import reset from "../../assets/reset.png";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
const Reset = () => {
  const [email, setEmail] = useState("");
  const [loading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Check your email for a reset link");
        setIsLoading(false);
      })

      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {loading && <Loader />}
      <section className={`container  ${styles.auth} `}>
        <div className={styles.img}>
          <img src={reset} alt="resetPassword" className="w-[400px]" />
        </div>
        <Card>
          <div className={` ${styles.form} `}>
            <h2 className="text-5xl font-bold ">Reset Password</h2>

            <form onSubmit={resetPassword}>
              <input
                type="text"
                name="Email"
                id="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="--btn text-white bg-blue-500 --btn-block"
              >
                Reset Password{" "}
              </button>
              <div className={styles.links}>
                <p>
                  <Link to={"/login"} className="font-bold text-slate-500">
                    - Login{" "}
                  </Link>
                </p>
                <p>
                  <Link to={"/register"} className="font-bold text-slate-500">
                    Register -
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
