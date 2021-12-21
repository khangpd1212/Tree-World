import BreadCrumb from "components/Base/BreadCrumb";
import AddressPayment from "components/Payment/AddressPayment";
import CartItemPayment from "components/Payment/CartItemPayment";
import PaymentMethod from "components/Payment/PaymentMethod";
import VoucherPayment from "components/Payment/VoucherPayment";
import React from "react";
import { selectCarts } from "redux/cart";
import { selectUsers } from "redux/user";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ShowModalLogin } from "redux/modal";
import "styles/payment.scss";
export default function Payment() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectCarts);
  const { userItems } = useSelector(selectUsers);
  
  const tokenLocal = localStorage.getItem("token");
  let token = tokenLocal ? JSON.parse(tokenLocal) : userItems.accessToken;
  if (!token) {
    dispatch(ShowModalLogin(true));
    return (
      <Redirect
        to={{
          pathname: document.referrer,
        }}
      />
    );
  }
  return (
    <div id="payment">
      <BreadCrumb className="breadcrumb" page="Payment" />
      <AddressPayment />
      {cartItems.length > 0 ? (
        <>
          <CartItemPayment />
          <VoucherPayment />
          <PaymentMethod />
        </>
      ) : null}
    </div>
  );
}
