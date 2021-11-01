import React from 'react'
import { Route } from "react-router-dom";
import LoginMobile from "../../pages/Login/LoginMobile";
export default function LoginLayout() {
    return (
        <div>
            <Route path="/login" exact component={LoginMobile} />
        </div>
    )
}
