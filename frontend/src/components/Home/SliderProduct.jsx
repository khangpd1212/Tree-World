import React, { useEffect } from 'react'
import { Col, Row } from "antd";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import { HeartFilled } from "@ant-design/icons";
import { fetchProducts } from 'redux/product';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export default function SliderProduct() {
   const dispatch = useDispatch();

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

   var icon_like = {
      fontSize: "2.5vw",
      color: "#E44343",
   };

   return (
      <div className="product-wrapper">
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

            <div className="h_product-flex">
               <div className="h_product-flex_hover">
                  <img srcSet="/images/product1.png" alt="img_product" />
                  <div className="h_product-flex_icon">
                     <a href="#" className="icon-like">
                        <HeartFilled style={icon_like} />
                     </a>
                  </div>
               </div>
               <div className="h_product-flex_content">
                  <p>jghjg</p>
                  <span>$ 25.00</span>
               </div>
            </div>

            <div className="h_product-flex">
               <div className="h_product-flex_hover">
                  <img srcSet="/images/product1.png" alt="img_product" />
                  <div className="h_product-flex_icon">
                     <a href="#" className="icon-like">
                        <HeartFilled style={icon_like} />
                     </a>
                  </div>
               </div>
               <div className="h_product-flex_content">
                  <p>jghjg</p>
                  <span>$ 25.00</span>
               </div>
            </div>
            <div className="h_product-flex">
               <div className="h_product-flex_hover">
                  <img srcSet="/images/product1.png" alt="img_product" />
                  <div className="h_product-flex_icon">
                     <a href="#" className="icon-like">
                        <HeartFilled style={icon_like} />
                     </a>
                  </div>
               </div>
               <div className="h_product-flex_content">
                  <p>jghjg</p>
                  <span>$ 25.00</span>
               </div>
            </div>
            <div className="h_product-flex">
               <div className="h_product-flex_hover">
                  <img srcSet="/images/product1.png" alt="img_product" />
                  <div className="h_product-flex_icon">
                     <a href="#" className="icon-like">
                        <HeartFilled style={icon_like} />
                     </a>
                  </div>
               </div>
               <div className="h_product-flex_content">
                  <p>jghjg</p>
                  <span>$ 25.00</span>
               </div>
            </div>


         </Slider>

         <div className="h_product-button">
            <button className="btn-home" type="submit">
               All product &gt;&gt;
            </button>
         </div>
      </div>
   )
}
