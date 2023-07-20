import { useState } from "react";
import styles from "./Auth.module.scss";
import login from "../../assets/login.gif";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import Card from "../../components/card/Card";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../redux/slice/cartSlice";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const previousURL = useSelector(selectPreviousURL);

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    }
    navigate("/");
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login Successful...");
        redirectUser();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  // Login with Goooglr
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success("Login Successfully");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      {loading && <Loader />}
      <section className={`container  ${styles.auth} `}>
        <div className={`bg-blue-900 rounded-l-2xl  rounded-r-sm shadow-2xl h-[435px] ${styles.img}`}>
          <img src={login} alt="login" className="w-[400px] " />
        </div>
        <Card>
          <div className={` ${styles.form} `}>
            <h2 className="text-5xl font-bold ">Login</h2>

            <form onSubmit={loginUser}>
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
              <button className="--btn text-white bg-blue-500 --btn-block"
                type="submit"> Login
              </button>
              <div className={styles.links}>
                <Link to={"/reset"} className="font-bold text-slate-600">
                  Reset Password
                </Link>
              </div>
              <p>-----or-----</p>
            </form>
            <button
              className="--btn text-white --btn-danger --btn-block"
              onClick={signInWithGoogle}
              >
              {" "}
              <AiOutlineGoogle color="#ffff" size={20} className="mr-3" /> Login
              with Google
            </button>
            <span className={styles.register}>
              <p>
                Don't have an account?{" "}
                <Link to={"/register"} className="font-bold text-slate-600">
                  Register
                </Link>
              </p>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
