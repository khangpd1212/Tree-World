import React from 'react'
import "styles/payment.scss";
import BreadCrumb from "components/Base/BreadCrumb";
import AddressPayment from "components/Payment/AddressPayment";
import VoucherPayment from 'components/Payment/VoucherPayment';
import PaymentMethod from 'components/Payment/PaymentMethod';
import CartItemPayment from 'components/Payment/CartItemPayment';
export default function Payment() {
   return (
      <div id="payment" className="container">
         <BreadCrumb className="breadcrumb" page="Payment" />
         <AddressPayment  />
         <CartItemPayment />
         <VoucherPayment  />
         <PaymentMethod   />
      </div>      
   )
}
