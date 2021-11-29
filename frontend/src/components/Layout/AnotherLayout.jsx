import React from 'react'
import { Route } from "react-router-dom";
import { LoginMobile, ResultPayment } from "pages";
export default function AnotherLayout() {
    return (
      <div>
        <Route path="/login" exact component={LoginMobile} />
        <Route path="/result" exact component={ResultPayment} />
      </div>
    );
}
