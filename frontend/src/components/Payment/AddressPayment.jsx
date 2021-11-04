import React from 'react'
import { Col, Row } from "antd";
import { EnvironmentFilled, RightOutlined } from '@ant-design/icons';
import { BtnOutlineGray, BtnOutlineBlue } from '../utils/Button'

export default function AddressPayment() {
   return (
      <div className="address">
         <img srcSet="./images/address.png" alt="address" />
         <div className="address__main">
            <div className="address__main--top">
               <p className="top__title">
                  <EnvironmentFilled style={{color: "red", fontSize: "20px"}}/>
                  <span className="top__title--text">your address</span>
               </p>
            </div>
            <div className="address__main--bottom">
               <span className="bottom__content">
                  Nú Nú (+84) 123456789	123/45 Captain American, C37, Thor, New York
               </span>
               <div className="bottom__button">
                  <BtnOutlineGray title={"default"}/>
                  <BtnOutlineBlue title={"change"}/>
               </div>
            </div>
            <RightOutlined className="icon-right"/>
         </div>
      </div>
   )
}
