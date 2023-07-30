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
  NotFound,
  CheckoutDetails,
  Checkout,
  OrderDetails,
  CheckoutSuccess,
} from "./pages/index";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/App.css";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Product from "./components/product/product";
import ReviewProducts from "./components/reviewProducts/ReviewProducts";
function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/products" element={<Product />} />
          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/review-product/:id" element={<ReviewProducts />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
