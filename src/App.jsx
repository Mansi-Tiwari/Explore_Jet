import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header, Footer } from "./components/index";
import {
  Home,
  Admin,
  OrderHistory,
  Contact,
  Cart,
  Login,
  Reset,
  Register,
} from "./pages/index";

import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/App.css";

function App() {
  return (
    <><ToastContainer/>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/history" element={<OrderHistory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
