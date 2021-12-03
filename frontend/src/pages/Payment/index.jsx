import BreadCrumb from "components/Base/BreadCrumb";
import AddressPayment from "components/Payment/AddressPayment";
import CartItemPayment from "components/Payment/CartItemPayment";
import PaymentMethod from "components/Payment/PaymentMethod";
import VoucherPayment from "components/Payment/VoucherPayment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ShowModalLogin } from "redux/modal";
import { selectUsers } from "redux/user";
import "styles/payment.scss";
export default function Payment() {
  const { userItems } = useSelector(selectUsers);
  const dispatch = useDispatch();
  if (Object.values(userItems).length === 0) {
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
