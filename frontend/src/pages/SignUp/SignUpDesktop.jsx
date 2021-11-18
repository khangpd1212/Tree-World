import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { fetchRegister } from "redux/user";
import {
  ShowModalLogin,
  selectModals,
  ShowModalSignUp,
  onCancelSignUp,
} from "redux/modal";
import "styles/Login/SignUpDesktop.scss";

export default function SignUpDesktop() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { isShowSignUp } = useSelector(selectModals);

  const handleShowLogin = () => {
    dispatch(ShowModalSignUp(false));
    dispatch(ShowModalLogin(true));
  };
  const onSubmit = (data) => {
    dispatch(fetchRegister(data));
    dispatch(ShowModalSignUp(false));
    dispatch(ShowModalLogin(true));
  };
  const handleCancel = () => {
    dispatch(onCancelSignUp(false));
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
          <img src="/logo.png" alt="tree-world-logo" className="logo-login" />
          <img src="images/bg_login.png" alt="bg-login" className="bg-login" />
        </div>
        <h1 className="title-login">Join Us!</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          className="content-login"
        >
          <input
            {...register("username")}
            className="content-login_input"
            type="text"
            id="userName"
            placeholder="Username*"
            style={{ width: "49%", display: "inline", marginRight: "10px" }}
          />
          <input
            {...register("phone_number")}
            className="content-login_input"
            type="number"
            id="phoneNumber"
            placeholder="Phone Number*"
            style={{ width: "48%", display: "inline" }}
          />
          <input
            {...register("email")}
            className="content-login_input"
            type="email"
            id="email"
            placeholder="Email*"
          />
          <input
            {...register("password")}
            className="content-login_input"
            type="password"
            id="password"
            placeholder="Password*"
          />
          <button type="submit" className="login-btn_submit">
            sign up
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
            <div onClick={handleShowLogin}>Get Started</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
