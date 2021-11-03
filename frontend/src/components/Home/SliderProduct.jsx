import React from 'react'
import { Col, Row } from "antd";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import SliderProductComp from './SliderProductComp';
import { useSelector } from "react-redux";
import { selectProducts } from "redux/product";
import Button from '../../components/utils/Button';

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
      <div className="product-wrapper container">
         <Row className="h_product">
            <Col className="h_product-title" xs={24} sm={10} md={8}>
               <h1>Choose your product from our collection</h1>
            </Col>
            <Col className="h_product-header" xs={24} sm={10}>
               <div className="h_product-header_flex">
                  <div>hot</div>
                  <div>new</div>
                  <div>view</div>
                  <div>favorite</div>
               </div>
            </Col>
         </Row>

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

         <div className="h_product-button">
            <Button title="all product >>" />
         </div>
      </div>
   )
}
