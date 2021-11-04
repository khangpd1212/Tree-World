import "styles/button.scss";
import "styles/Home/Home.scss";
import { useDispatch } from "react-redux";
import { setLayoutStatus } from "redux/layout";
import { Col, Row } from "antd";

import Banner from "components/Home/Banner";
import SliderProduct from "components/Home/SliderProduct";
import RecommendHome from "components/Home/RecommendHome";
import HeaderProduct from "components/Home/HeaderProduct";
import Button from '../../components/utils/Button'
export default function Home() {
   const dispatch = useDispatch();
   dispatch(setLayoutStatus(false));

   return (
      <div id="Home">
         <Banner />
         <div className="product-wrapper container_home">
            <HeaderProduct/>
            <SliderProduct />
            <div className="h_product-button">
               <Button title="all product >>" />
            </div>
         </div>
         <RecommendHome />
      </div>
   );
}
