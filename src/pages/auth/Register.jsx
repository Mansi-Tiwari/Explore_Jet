import React, { useState } from "react";
import styles from "./Auth.module.scss";
import register from "../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match.");
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("Registration Successful....");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(`${error.message}: ${error.code}`);
        setIsLoading(false);
      });
  };

  return (
    <>
      {loading && <Loader />}
      <section className={`container ${styles.auth} `}>
        <div className={`bg-blue-900 rounded-l-2xl  rounded-r-sm shadow-2xl h-[390px] ${styles.img}`}>
          <img src={register} alt="register" className="w-[300px]" />
        </div>
        <Card>
          <div className={` ${styles.form}   bg-slate-80`}>
            <h2 className="text-5xl font-bold ">Register</h2>

            <form onSubmit={registerUser}>
              <input
                type="text"
                name="Email"
                id="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="text"
                name="password"
                id="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="text"
                name="confirm"
                id="confirm"
                required
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <button
                className="--btn text-white bg-blue-500 --btn-block"
                type="submit"
              >
                Register
              </button>
            </form>

            <span className={styles.register}>
              <p>
                Already an account?{" "}
                <Link to={"/login"} className="font-bold text-slate-600">
                  Login
                </Link>
              </p>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Register;
