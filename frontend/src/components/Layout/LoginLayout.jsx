import React from 'react'
import {Route} from "react-router-dom";
import {Login} from "../../pages";

export default function LoginLayout() {
    return (
        <div>
            <Route path="/login" exact component={Login}/>
        </div>
    )
}
