import { Modal, Checkbox } from 'antd'
import React, { useState } from 'react'

export default function ModalLogin() {
    const [isOpen, setisOpen] = useState(true)
    return (
        <Modal
            width={"40vw"}
            bodyStyle={{ padding: 0 }}
            closable={false}
            wrapClassName="modal"
            footer={false}
            visible={isOpen}
            onCancel={()=> setisOpen(!isOpen)}
        >
            <div className="img-login">
                <img src="/logo.png" alt="tree-world-logo" className="logo-login" />
                <img src="images/bg_login.png" alt="bg-login" className="bg-login" />
            </div>
            <h1 className="title-login">Welcome!</h1>
            <form className="content-login">
                <input type="text" placeholder="Username*" />
                <input type="password" placeholder="Password*" />
                <div className="wrapper-remember_forgot">
                    <Checkbox>Remember</Checkbox>
                    <a href="#" className="login-forget">
                        Forget Password?
                    </a>
                </div>
                <button type="submit" className="login-btn_submit">
                    login
                </button>
            </form>
            <div className="footer-login">
                <div className="icon-login">
                    <a href="#">
                        <img src="images/icon-fb_login.png" alt="icon-fb_login" />
                    </a>
                    <a href="#">
                        <img
                            src="images/icon-twitter_login.png"
                            alt="icon-twitter_login"
                        />
                    </a>
                    <a href="#">
                        <img src="images/icon-gg_login.png" alt="icon-gg_login" />
                    </a>
                </div>
                <div className="add-account">
                    <a href="#">Create account</a>
                </div>
            </div>
        </Modal>
    )
}
