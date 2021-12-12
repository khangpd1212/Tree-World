import { Modal, Tag } from "antd";
import IconPassword from "components/utils/IconPassword";
import useAutoLogin from "hooks/useAutoLogin";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectModals,
  ShowModalForget,
  ShowModalLogin,
  ShowModalSignUp
} from "redux/modal";
import { fetchLogin } from "redux/user";
import "styles/Login/LoginDesktop.scss";
import { encoded } from "utils/encoded";
function LoginDesktop() {
  const [passwordShown, setPasswordShown] = useState(false);
  const { register, handleSubmit, formState, resetField } = useForm();
  const { errors } = formState;
  const dispatch = useDispatch();
  const { isShowLogin } = useSelector(selectModals);
  const { autoLogin } = useAutoLogin();

  const handleShowPass = () => {
    setPasswordShown(!passwordShown);
  };

  const handleShowSignUp = () => {
    dispatch(ShowModalSignUp(true));
    dispatch(ShowModalLogin(false));
  };

  const showFormForget = () => {
    dispatch(ShowModalForget(true));
    dispatch(ShowModalLogin(false));
  }

  const onSubmit = async (data) => {

    const response = await dispatch(fetchLogin(data));

    if (Object.values(response.payload).length !== 0) {
      dispatch(ShowModalLogin(false));
    } else {
      dispatch(ShowModalLogin(true));
    }
    resetField("username");
    resetField("password");
  };

  const handleCancel = () => {
    dispatch(ShowModalLogin(false));
  };

  useEffect(() => {
    let tokenUserLocal = localStorage.getItem("token");
    const token = tokenUserLocal && encoded.encodedUser(tokenUserLocal);
    if (token) {
      dispatch(ShowModalLogin(false));
      autoLogin(token.id, token.isAdmin);
    }
  }, []);
  return (
    <>
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
            src="../../logo.png"
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
            <div className="login-forget" onClick={showFormForget}>
              Forget Password?
            </div>
          </div>
          <button type="submit" className="login-btn_submit">
            sign in
          </button>
        </form>
        <div className="footer-login">
          <div className="icon-login">
            <div>
              <img src="../../images/icon-fb_login.png" alt="icon-fb_login" />
            </div>
            <div>
              <img
                src="../../images/icon-twitter_login.png"
                alt="icon-twitter_login"
              />
            </div>
            <div>
              <img src="../../images/icon-gg_login.png" alt="icon-gg_login" />
            </div>
          </div>
          <div className="add-account">
            <div onClick={handleShowSignUp}>Create account</div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default LoginDesktop;
