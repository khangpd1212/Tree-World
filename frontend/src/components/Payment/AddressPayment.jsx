import { EnvironmentFilled, RightOutlined } from '@ant-design/icons';
import { BtnOutlineGray, BtnOutlineBlue } from '../utils/Button'
import ModalAddress from "./ModalAddress";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showTextAddress, selectProvince } from "redux/address/province";

export default function AddressPayment() {
   const [visible, setVisible] = useState(false);
   const dispatch = useDispatch();
   const { textAddress } = useSelector(selectProvince)

   // useEffect(() => {
   //    let addressGetLocal = localStorage.getItem("address"));
   //    let itemAddressLocal = addressGetLocal ? addressGetLocal : [];
   //    dispatch(showTextAddress(itemAddressLocal))
   // }, [dispatch])

   const handleDefaultAddress = () => {
      localStorage.setItem("address", JSON.stringify(textAddress));
   }
   const onCreate = (values) => {
      localStorage.setItem("address", JSON.stringify(values));
      dispatch(showTextAddress(values))
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
                  textAddress && textAddress.map((text, index) => (
                     <span className="bottom__content" key={index}>
                        {text.name} - {text.phone} <br />
                        {text.street}, {text.ward}, {text.district}, {text.province}
                     </span>
                  ))
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
