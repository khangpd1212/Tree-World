import React, {memo} from 'react';
import {
   Modal,
} from "antd";
import {useSelector} from "react-redux";
import {selectUsers} from "../../redux/user";

function LoginDesktop(props) {
   const { userList } = useSelector(selectUsers);
   console.log(userList);
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
            <img src="/logo.png" alt="tree-world-logo" className="logo-login" />
            <img src="images/bg_login.png" alt="bg-login" className="bg-login" />
         </div>
         <h1 className="title-login">Welcome!</h1>
         <form className="content-login">
            <input className="content-login_input" type="text" placeholder="Username*" />
            <input className="content-login_input" type="password" placeholder="Password*" />
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
export default memo(LoginDesktop);