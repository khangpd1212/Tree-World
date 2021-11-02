import "styles/home.scss";
import "styles/button.scss";

import { useDispatch } from "react-redux";
import { setLayoutStatus } from "redux/layout";

import Banner from "components/Home/Banner";
import SliderProduct from "components/Home/SliderProduct";
import RecommendHome from "components/Home/RecommendHome";
import BlogHome from "components/Home/BlogHome";
export default function Home() {
  const dispatch = useDispatch();
  dispatch(setLayoutStatus(false));

  return (
    <div id="Home">
      <Banner/>
      <SliderProduct/>
      <RecommendHome/>
      <BlogHome />
    </div>
  );
}
