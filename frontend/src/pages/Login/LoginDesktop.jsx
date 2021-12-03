import { Modal, Tag } from "antd";
import IconPassword from "components/utils/IconPassword";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  onCancelLogin, selectModals,
  ShowModalLogin, ShowModalSignUp
} from "redux/modal";
import { fetchLogin,selectUsers } from "redux/user";
import "styles/Login/LoginDesktop.scss";

function LoginDesktop() {
  const [passwordShown, setPasswordShown] = useState(false);
  const { register, handleSubmit, formState, resetField } = useForm();
  const { isDirty, isValid, errors } = formState;
  const dispatch = useDispatch();
  const { isShowLogin } = useSelector(selectModals);
  const { userItems } = useSelector(selectUsers);

  const handleShowPass = () => {
    setPasswordShown(!passwordShown);
  };

  const handleShowSignUp = () => {
    dispatch(ShowModalSignUp(true));
    dispatch(ShowModalLogin(false));
  };
  const onSubmit = (data) => {
    dispatch(fetchLogin(data));
    if (Object.values(userItems).length !== 0) {
      dispatch(ShowModalLogin(false));
      resetField("username");
      resetField("password");
    } else {
      toast.error(`Login is error`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    }
  };
  const handleCancel = () => {
    dispatch(onCancelLogin(false));
  };

  return (
    <Modal
      width={"38vw"}
      bodyStyle={{ padding: 0, position: "relative" }}
      closable={false}
      wrapClassName="modal"
      footer={null}
      visible={isShowLogin}
      onCancel={handleCancel}
    >
      <div className="img-login">
        <img
          src="../..//logo.png"
          alt="tree-world-logo"
          className="logo-login"
        />
        <img
          src="../../images/bg_login.png"
          alt="bg-login"
          className="bg-login"
        />
      </div>
      <h1 className="title-login">Welcome!</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="content-login"
      >
        <div className="wrapper_input">
          <input
            {...register("username", { required: true })}
            className="content-login_input"
            type="text"
            placeholder="Username*"
          />
          {errors.username && (
            <Tag
              color="error"
              style={{ paddingBottom: "2px", fontSize: "14px" }}
            >
              Please input username
            </Tag>
          )}
        </div>
        <div className="wrapper_password wrapper_input">
          <input
            {...register("password", { required: true })}
            className="content-login_input"
            type={passwordShown ? "text" : "password"}
            name="password"
            placeholder="Password*"
          />
          <IconPassword
            iconRender={passwordShown}
            handleOnClick={handleShowPass}
          />
          {errors.password && (
            <Tag
              color="error"
              style={{ paddingBottom: "2px", fontSize: "14px" }}
            >
              Please input password
            </Tag>
          )}
        </div>
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
        <button type="submit" className="login-btn_submit">
          sign in
        </button>
      </form>
      <div className="footer-login">
        <div className="icon-login">
          <a href="#">
            <img src="../../images/icon-fb_login.png" alt="icon-fb_login" />
          </a>
          <a href="#">
            <img
              src="../../images/icon-twitter_login.png"
              alt="icon-twitter_login"
            />
          </a>
          <a href="#">
            <img src="../../images/icon-gg_login.png" alt="icon-gg_login" />
          </a>
        </div>
        <div className="add-account">
          <div onClick={handleShowSignUp}>Create account</div>
        </div>
      </div>
    </Modal>
  );
}
export default LoginDesktop;
