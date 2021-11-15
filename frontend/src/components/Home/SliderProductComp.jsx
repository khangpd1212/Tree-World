import React from 'react'
import { HeartFilled, ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";

import { useDispatch } from 'react-redux';
import { addItemToCart } from 'redux/cart';

export default function SliderProductComp(props) {

   const prod = props.product;
   const dispath = useDispatch();
   return (
      <div className="h_product-flex">
         <div className="h_product-flex_hover">
            <img srcSet={prod.image[0]} alt="img_product" />
            <div className="h_product-flex_icon">
               <div className="icon-like">
                  <HeartFilled className="icon-card" />
               </div>
            </div>
            <div className="h_product-flex_sidebar">
               <div className="icon-cart icon_hidden" 
                     onClick={() => {
                        dispath(addItemToCart(prod))
                     }}
               >
                  <ShoppingCartOutlined className="icon-card " />
               </div>
               <div className="icon_hidden">
                  <ShoppingOutlined className="icon-card " />
               </div>
            </div>
         </div>
         <div className="h_product-flex_content">
            <p>{prod.product_name}</p>
            <span>${prod.price}</span>
         </div>
      </div>
   )
}
