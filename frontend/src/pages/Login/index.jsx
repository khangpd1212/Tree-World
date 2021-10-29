import React from 'react';
import {Checkbox} from "antd";
import {CloseOutlined} from '@ant-design/icons';
import "styles/login.scss";
import {Link} from 'react-router-dom';

export default function Login() {
    return (
        <div className="login_mobile">
            <Link to="/" className="login_mobile-icon">
                <CloseOutlined/>
            </Link>
            <img src="/images/bg_login-mobile.png" alt="bg_login-mobile.png" className="login_mobile-bg"/>
            <h1 className="login_mobile-title">Welcome!</h1>
            <form className="login_mobile-content">
                <input type="text" placeholder="Username*"/>
                <input type="password" placeholder="Password*"/>
                <div className="login_mobile-remember">
                    <Checkbox>Remember me</Checkbox>
                    <a href="#" className="login-forget">Forget Password?</a>
                </div>
                <button type="submit" className="login-btn_submit">login</button>
            </form>
            <div className="login_mobile-connect">
                <p>or connect with:</p>
                <div className="content-connect">
                    <a href="#" className="icon fb_connect">
                        <img src="/images/fb_mobile.png" alt="icon-fb_mobile"/>
                        <span>facebook</span>
                    </a>
                    <a href="#" className="icon twitter_connect">
                        <img src="/images/twitter_mobile.png" alt="icon-twitter_mobile"/>
                        <span>twitter</span>
                    </a>
                    <a href="#" className="icon gg_connect">
                        <img src="/images/gg_mobile.png" alt="icon-gg_mobile"/>
                        <span>google+</span>
                    </a>
                </div>
            </div>
            <div className="sign-up">
                <span>Don't have an account? <a href="#">Sign Up</a></span>
            </div>
        </div>
    );
}
