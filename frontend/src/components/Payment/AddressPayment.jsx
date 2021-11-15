import React from 'react'
import { EnvironmentFilled, RightOutlined } from '@ant-design/icons';
import { BtnOutlineGray, BtnOutlineBlue } from '../utils/Button'
import ModalAddress from "./ModalAddress";
import { useState, useEffect } from "react";

export default function AddressPayment() {
   const [visible, setVisible] = useState(false);
   const [addressLocal, setAddressLocal] = useState([]);
   const [addressText, setAddressText] = useState([]);

   useEffect(() => {
      let addressGetLocal = JSON.parse(localStorage.getItem("address"));
      let itemAddressLocal = addressGetLocal ? addressGetLocal : [];
      setAddressLocal(itemAddressLocal)
   }, [])

   useEffect(() => {
      let addressGetSession = JSON.parse(sessionStorage.getItem("address"));
      let itemAddressSession = addressGetSession ? addressGetSession : [];
      setAddressText(itemAddressSession)
   }, [])

   const handleDefaultAddress = () => {
      localStorage.setItem("address", JSON.stringify(addressText));
      let addressStorage = localStorage.getItem("address");
      setAddressLocal(JSON.parse(addressStorage));
   }
   const onCreate = (values) => {
      sessionStorage.setItem("address" , JSON.stringify([values]));
      setAddressText(JSON.parse(sessionStorage.getItem("address")));
      setVisible(false);
   };

   const showModal = () => {
      setVisible(true)
   }

   return (
      <div className="address">
         <img srcSet="./images/address.png" alt="address" />
         <div className="address__main">
            <div className="address__main--top">
               <p className="top__title">
                  <EnvironmentFilled style={{ color: "#d64848", fontSize: "20px" }} />
                  <span className="top__title--text">your address</span>
               </p>
            </div>
            <div className="address__main--bottom">
               {
                  addressLocal.length === 0 && addressText.length === 0
                  ? null :
                  addressLocal.length === 0 || addressText.length > 0 
                  ? (addressText.map((text, index) => (
                     <span className="bottom__content" key={index}>
                        {text.name} - {text.phone} <br />
                        {text.street}, {text.ward}, {text.district}, {text.province}
                     </span>
                     ))
                  ) : (addressLocal.map((text, index) => (
                     <span className="bottom__content" key={index}>
                        {text.name} - {text.phone} <br />
                        {text.street}, {text.ward}, {text.district}, {text.province}

                     </span>
                  )))
               }

               <div className="bottom__button">
                  <BtnOutlineGray
                     title={"default"}
                     handleOnClick={handleDefaultAddress}
                  />
                  <BtnOutlineBlue
                     title={"change"}
                     handleOnClick={showModal}
                  />
                  <ModalAddress
                     visible={visible}
                     onCreate={onCreate}
                     onCancel={() => {
                        setVisible(false);
                     }}
                  />
               </div>
            </div>
            <RightOutlined className="icon-right" />
         </div>
      </div>
   )
}
