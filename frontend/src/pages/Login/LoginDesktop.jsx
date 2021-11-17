import { useState, useEffect } from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectLogins, ShowModalLogin, onCancelLogin, onOkLogin, onLogin } from "redux/login";
import { fetchUsers, selectUsers } from "redux/user";
import { ShowModalSignUp } from "redux/SignUp"
import "styles/Login/LoginDesktop.scss";


function LoginDesktop() {
  const [text, setText] = useState({
    name: '',
    pass: ''
  })
  const { userList } = useSelector(selectUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const { isShowLogin } = useSelector(selectLogins);
  const handleShowSignUp = () => {
    dispatch(ShowModalSignUp(true));
    dispatch(ShowModalLogin(false))
  }
  const handleOk = (e) => {
    // const a = userList.find(x.)
    dispatch(onLogin(text))
    // dispatch(onOkLogin(false));
  }
  const handleCancel = () => {
    dispatch(onCancelLogin(false));
  }
  const handleChangeName = (e) => {
    setText({...text, name: e.target.value});
  }
  const handleChangePassword = (e) => {
    setText({...text, pass: e.target.value});
  }
  return (
    <Modal
      width={"38vw"}
      bodyStyle={{ padding: 0, position: "relative" }}
      closable={false}
      wrapClassName="modal"
      footer={null}
      visible={isShowLogin}
      // onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className="img-login">
        <img src="/logo.png" alt="tree-world-logo" className="logo-login" />
        <img src="images/bg_login.png" alt="bg-login" className="bg-login" />
      </div>
      <h1 className="title-login">Welcome!</h1>
      <form className="content-login">
        <input
          className="content-login_input"
          type="text"
          placeholder="Username*"
          onChange={handleChangeName}
        />
        <input
          className="content-login_input"
          type="password"
          placeholder="Password*"
          onChange={handleChangePassword}
        />
        <div className="wrapper-remember_forgot">
          <div className="wrapper-checkbox">
            <input type="checkbox" id="login_checkbox" />
            <label htmlFor="login_checkbox" className="label-checkbox">
              Remember
            </label>
          </div>
          <a href="#" className="login-forget">
            Forget Password?
          </a>
        </div>
        <button onClick={handleOk} className="login-btn_submit">
          sign in
        </button>
      </form>
      <div className="footer-login">
        <div className="icon-login">
          <a href="#">
            <img src="images/icon-fb_login.png" alt="icon-fb_login" />
          </a>
          <a href="#">
            <img src="images/icon-twitter_login.png" alt="icon-twitter_login" />
          </a>
          <a href="#">
            <img src="images/icon-gg_login.png" alt="icon-gg_login" />
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
