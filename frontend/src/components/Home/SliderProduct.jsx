import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, selectProducts } from "redux/product";
import { useEffect } from "react";

import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../styles/Home/SliderProduct.scss";

import Slider from "react-slick";
import SliderProductComp from "./SliderProductComp";

export default function SliderProduct() {
   const { productList } = useSelector(selectProducts);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchProducts());
   }, [dispatch]);

   var settings = {
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: "linear",
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 1,
               initialSlide: 2,
            },
         },
         {
            breakpoint: 480,
            settings: {
               pauseOnHover: true,
               autoplaySpeed: 2000,
               slidesToShow: 1,
               slidesToScroll: 1,
               dots: true,
               appendDots: (dots) => <ul style={{ width: "90%" }}>{dots}</ul>,
            },
         },
      ],
   };


   return (
      <Slider className="h_product-main" {...settings}>
         {
            productList &&
            productList.map((productItem, index) =>
               <SliderProductComp
                  key={index}
                  product={productItem}
               />)
         }
      </Slider>
   )

}
