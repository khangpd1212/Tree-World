
import React from 'react'

import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import SliderProductComp from "./SliderProductComp";
import { useSelector } from "react-redux";
import { selectProducts } from "redux/product";

import "../../styles/Home/SliderProduct.scss";


export default function SliderProduct() {
  const { productList } = useSelector(selectProducts);
  console.log(productList);
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
         {productList &&
            productList.map((product, index) => (
               <SliderProductComp
                  key={index}
                  src={product.image[0]}
                  name={product.product_name}
                  price={product.price}
               />
            ))
         }
         <SliderProductComp
            src="./images/product1.png"
            name="dsada"
            price="$13213"
         />
         <SliderProductComp
            src="./images/product1.png"
            name="dsada"
            price="$13213"
         />
         <SliderProductComp
            src="./images/product1.png"
            name="dsada"
            price="$13213"
         />
         <SliderProductComp
            src="./images/product1.png"
            name="dsada"
            price="$13213"
         />
      </Slider>
   )

}
