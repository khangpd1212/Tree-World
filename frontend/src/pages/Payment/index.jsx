import React from 'react'
import "styles/payment.scss";
import BreadCrumb from "components/Base/BreadCrumb";
import AddressPayment from "components/Payment/AddressPayment";
export default function Payment() {
   return (
      <div id="payment" className="container">
         <BreadCrumb className="breadcrumb" page="Payment" />
         <AddressPayment />
      </div>      
   )
}
