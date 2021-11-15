import { Modal } from "antd";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { login } from "redux/user";
import "styles/Login/LoginDesktop.scss";

function LoginDesktop(props) {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault();
    const [{value: email}, {value: password}] = event.target;
    await dispatch(login({email, password})).then(console.log)
    props.handleCancel()
  }

  return (
    <Modal
      width={"38vw"}
      bodyStyle={{ padding: 0 }}
      closable={false}
      wrapClassName="modal"
      footer={null}
      visible={props.showModal}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
    >
      <div className="img-login">
        <img src="../..//logo.png" alt="tree-world-logo" className="logo-login" />
        <img src="../../images/bg_login.png" alt="bg-login" className="bg-login" />
      </div>
      <h1 className="title-login">Welcome!</h1>
      <form className="content-login"  onSubmit={e => handleLogin(e)}>
        <input
          className="content-login_input"
          type="email"
          placeholder="Email*"
          name="email"
        />
        <input
          className="content-login_input"
          type="password"
          name="password"
          placeholder="Password*"
        />
        <div className="wrapper-remember_forgot">
          <div className="wrapper-checkbox">
            <input type="checkbox" id="login_checkbox" name="remember" />
            <label htmlFor="login_checkbox" className="label-checkbox">
              Remember
            </label>
          </div>
          <a href="#" className="login-forget">
            Forget Password?
          </a>
        </div>
        <button
          type="submit"
          className="login-btn_submit"
        >
          login
        </button>
      </form>
      <div className="footer-login">
        <div className="icon-login">
          <a href="#">
            <img src="../../images/icon-fb_login.png" alt="icon-fb_login" />
          </a>
          <a href="#">
            <img src="../../images/icon-twitter_login.png" alt="icon-twitter_login" />
          </a>
          <a href="#">
            <img src="../../images/icon-gg_login.png" alt="icon-gg_login" />
          </a>
        </div>
        <div className="add-account">
          <a href="#">Create account</a>
        </div>
      </div>
    </Modal>
  );
}
export default memo(LoginDesktop);
