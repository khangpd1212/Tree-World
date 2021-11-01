import React from 'react'
import { HeartFilled } from "@ant-design/icons";

export default function SliderProductComp(props) {
   var icon_like = {
      fontSize: "2.5vw",
      color: "#E44343",
   };
   
   return (
      <div className="h_product-flex">
         <div className="h_product-flex_hover">
            <img srcSet={props.src} alt="img_product" />
            <div className="h_product-flex_icon">
               <a href="#" className="icon-like">
                  <HeartFilled style={icon_like} />
               </a>
            </div>
         </div>
         <div className="h_product-flex_content">
            <p>{props.name}</p>
            <span>${props.price}</span>
         </div>
      </div>
   )
}
