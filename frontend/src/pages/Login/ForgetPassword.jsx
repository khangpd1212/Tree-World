import { Modal, Tag } from "antd";
import IconPassword from "components/utils/IconPassword";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { patterns, validations } from "utils/validation";
import { selectModals, ShowModalForget, ShowModalLogin } from "redux/modal";
import "styles/Login/LoginDesktop.scss";
import { requests } from "utils/axios";

function ForgetPassword() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [showInputPass, setShowInputPass] = useState(false);
  const { register, handleSubmit, formState, resetField, unregister } =
    useForm();
  const { errors } = formState;

  const dispatch = useDispatch();

  const { isShowForget } = useSelector(selectModals);

  const params = new URLSearchParams(window.location.search);
  const paramToken = params.get("token");
  const paramId = params.get("id");

  const handleShowPass = () => {
    setPasswordShown(!passwordShown);
  };

  const onSendMail = (data) => {
    const { email, password } = data;

    if (showInputPass) {
      if (!validations.checkBlankSpace(password)) {
        toast.error("You are not allowed text only white space");
      } else {
        requests
          .fetchNewPassword(paramId, paramToken, { password: password })
          .then(
            (res) => {
              if (res) {
                toast.success(res.message, {
                  position: "top-right",
                  autoClose: 3000,
                });
                dispatch(ShowModalForget(false));
                dispatch(ShowModalLogin(true));
              }
            },
            (err) => {
              if (err) {
                toast.error(err.response.data.message, {
                  position: "top-right",
                  autoClose: 3000,
                });
              }
            }
          );
      }
      resetField("password");
    } else {
      if (!validations.checkBlankSpace(email)) {
        toast.error("You are not allowed text only white space");
      } else {
        requests.fetchResetPassword({ email: email }).then(
          (res) => {
            toast.info(res.message, {
              position: "top-right",
              autoClose: 3000,
            });
          },
          (err) => {
            if (err) {
              toast.error(err.response.data.message, {
                position: "top-right",
                autoClose: 3000,
              });
            }
          }
        );
      }
      resetField("email");
    }
  };

  useEffect(() => {
    if (paramToken && paramId) {
      setShowInputPass(true);
      dispatch(ShowModalForget(true));
      unregister("email");
    } else {
      setShowInputPass(false);
      unregister("password");
    }
  }, [paramToken, paramId, unregister, dispatch]);

  const handleCancel = () => {
    dispatch(ShowModalForget(false));
    setShowInputPass(false);
  };
  const handleShowForget = () => {
    setShowInputPass(false);
    resetField("password");
  };
  const handleShowLogin = () => {
    dispatch(ShowModalForget(false));
    dispatch(ShowModalLogin(true));
  };
  return (
    <Modal
      width={"38vw"}
      bodyStyle={{ padding: 0, position: "relative" }}
      closable={false}
      wrapClassName="modal"
      footer={null}
      visible={isShowForget}
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
      <form onSubmit={handleSubmit(onSendMail)} className="content-login">
        {showInputPass ? (
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
        ) : (
          <div className="wrapper_input">
            <input
              {...register("email", {
                required: true,
                type: "regexp",
                pattern: new RegExp(patterns.emailPattern),
              })}
              className="content-login_input"
              type="text"
              placeholder="Email*"
            />
            {errors.email && (
              <Tag
                color="error"
                style={{ paddingBottom: "2px", fontSize: "14px" }}
              >
                Error email
              </Tag>
            )}
          </div>
        )}

        <button type="submit" className="login-btn_submit">
          Submit
        </button>
      </form>
      <div className="footer-login">
        <div className="add-account">
          {showInputPass ? (
            <div onClick={handleShowForget}>Forget Password?</div>
          ) : (
            <div onClick={handleShowLogin}>Get Started</div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ForgetPassword;
