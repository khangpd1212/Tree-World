import React from 'react'
import "styles/payment.scss";
import AboutTitle from "components/About/AboutTitle";
import AboutAlbum from "components/About/AboutAlbum";
import AboutUpdates from "components/About/AboutUpdates"

export default function Payment() {
  return (
    <div id="payment" className="container">
      <AboutTitle   />
      <AboutAlbum   />
      <AboutUpdates />
    </div>
  )
}
