import React from 'react'
import { HeartFilled } from "@ant-design/icons";

import { useDispatch } from 'react-redux';
import { addItemToCart } from 'redux/cart';

export default function SliderProductComp(props) {
   var icon_like = {
      fontSize: "2.5vw",
      color: "#E44343",
   };
   const prod = props.product;
   const dispath = useDispatch();
   return (
      <div className="h_product-flex">
         <div className="h_product-flex_hover">
            <img srcSet={prod.image[0]} alt="img_product" />
            <div className="h_product-flex_icon">
               <a href="#" className="icon-like">
                  <HeartFilled style={icon_like} />
               </a>
            </div>
         </div>
         <div className="h_product-flex_content">
            <p>{prod.product_name}</p>
            <span>${prod.price}</span>
            <button onClick={() => {
               dispath(addItemToCart(prod))
            }}>Add cart</button>
         </div>
      </div>
   )
}
