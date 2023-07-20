import React, { useEffect } from "react";
import Product from "../../components/product/product";
import Slider from "../../components/slider/Slider";

const Home = () => {
  const url = window.location.href;

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
      <div >

      <Slider />
      </div>
      <div className="my-10">

      <Product />
      </div>
    </div>
  );
};

export default Home;
