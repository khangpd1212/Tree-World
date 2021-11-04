import "styles/home.scss";
import "styles/button.scss";

import { useDispatch } from "react-redux";
import { setLayoutStatus } from "redux/layout";

import Banner from "components/Home/Banner";
import SliderProduct from "components/Home/SliderProduct";
import RecommendHome from "components/Home/RecommendHome";
import BlogHome from "components/Home/BlogHome";
import { useEffect } from "react";
import { fetchProducts } from "redux/product";
export default function Home() {
  const dispatch = useDispatch();
  dispatch(setLayoutStatus(false));

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div id="Home">
      <Banner />
      <SliderProduct />
      <RecommendHome />
      <BlogHome />
    </div>
  );
}
