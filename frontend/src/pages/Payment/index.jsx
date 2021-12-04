import BreadCrumb from "components/Base/BreadCrumb";
import AddressPayment from "components/Payment/AddressPayment";
import CartItemPayment from "components/Payment/CartItemPayment";
import PaymentMethod from "components/Payment/PaymentMethod";
import VoucherPayment from "components/Payment/VoucherPayment";
import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { ShowModalLogin } from "redux/modal";
import "styles/payment.scss";
export default function Payment() {
  const dispatch = useDispatch();
  let token = JSON.parse(localStorage.getItem("token"));
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
      <CartItemPayment />
      <VoucherPayment />
      <PaymentMethod />
    </div>
  );
}
