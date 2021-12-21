import { Modal, Tag } from "antd";
import IconPassword from "components/utils/IconPassword";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectModals, ShowModalLogin, ShowModalSignUp } from "redux/modal";
import { fetchRegister } from "redux/user";
import { patterns, validations } from "utils/validation";
import { toast } from "react-toastify";
import { requests } from "utils/axios";

export default function SignUpDesktop() {
  const [passwordShown, setPasswordShown] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { isShowSignUp } = useSelector(selectModals);

  const handleShowPass = () => {
    setPasswordShown(!passwordShown);
  };
  const handleShowLogin = () => {
    dispatch(ShowModalSignUp(false));
    dispatch(ShowModalLogin(true));
  };
  const onSubmit = (data) => {
    if (
      !validations.checkBlankSpace(data.username) ||
      !validations.checkBlankSpace(data.password)
    ) {
      toast.error("You are not allowed text only white space");
    } else {
      requests.fetchRegister(data).then(
        () => {
          toast.success("Sign up successfully!!!", {
            autoClose: 2000,
          });
          dispatch(ShowModalSignUp(false));
          dispatch(ShowModalLogin(true));
        },
        (err) => {
          toast.error(err.response.data.message, {
            autoClose: 2000,
          });
        }
      );
    }
  };
  const handleCancel = () => {
    dispatch(ShowModalSignUp(false));
  };
  return (
    <Modal
      width={"38vw"}
      bodyStyle={{ padding: 0 }}
      closable={false}
      wrapClassName="modal"
      footer={null}
      visible={isShowSignUp}
      onCancel={handleCancel}
    >
      <div name="form_in_modal">
        <div className="img-login">
          <img src="../logo.png" alt="tree-world-logo" className="logo-login" />
          <img
            src="../images/bg_login.png"
            alt="bg-login"
            className="bg-login"
          />
        </div>
        <h1 className="title-login">Join Us!</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          className="content-login"
        >
          <div className="wrapper_input input_flex">
            <div>
              <input
                {...register("username", { required: true })}
                className="content-login_input"
                type="text"
                id="userName"
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
            <div>
              <input
                {...register("phone_number", {
                  required: true,
                  type: "regexp",
                  pattern: new RegExp(patterns.phonePattern),
                })}
                className="content-login_input"
                type="tel"
                id="phoneNumber"
                placeholder="Phone Number*"
              />
              {errors.phone_number && (
                <Tag
                  color="error"
                  style={{ paddingBottom: "2px", fontSize: "14px" }}
                >
                  Error phone number
                </Tag>
              )}
            </div>
          </div>
          <div className="wrapper_input">
            <input
              {...register("email", {
                required: true,
                type: "regexp",
                pattern: new RegExp(patterns.emailPattern),
              })}
              className="content-login_input"
              type="text"
              id="email"
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
          <button type="submit" className="login-btn_submit">
            sign up
          </button>
        </form>
        <div className="footer-login">
          <div className="icon-login">
            <div>
              <img src="../images/icon-fb_login.png" alt="icon-fb_login" />
            </div>
            <div>
              <img
                src="../images/icon-twitter_login.png"
                alt="icon-twitter_login"
              />
            </div>
            <div>
              <img src="../images/icon-gg_login.png" alt="icon-gg_login" />
            </div>
          </div>
          <div className="add-account">
            <div onClick={handleShowLogin}>Get Started</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
