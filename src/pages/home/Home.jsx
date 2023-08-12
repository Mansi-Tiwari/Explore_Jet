import React, { useEffect } from "react";
import Slider from "../../components/slider/Slider";
import ProductsList from "../../components/products/ProductsList";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/slice/productSlice";

const Home = () => {
  const url = window.location.href;
  const products = useSelector(selectProducts);

  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes("#products")) {
        window.scrollTo({
          top: 700,
          behavior: "smooth",
        });
        return;
      }
    };
    scrollToProducts();
  }, [url]);

  return (
    <div>
      <div>
        <Slider />
      </div>
      <div className="my-10">
        <ProductsList />
      </div>
    </div>
  );
};

export default Home;
