import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectSignUp, ShowModalSignUp, onCancelSignUp, onOkSignUp } from "redux/SignUp";
import { ShowModalLogin } from "redux/login";
import { useEffect} from "react"
import { signupUser, loginUser } from "redux/user";
import "styles/Login/SignUpDesktop.scss";

export default function SignUpDesktop() {
   const dispatch = useDispatch();
   const { isShowSignUp } = useSelector(selectSignUp);

   const handleShowLogin = () => {
      dispatch(ShowModalSignUp(false));
      dispatch(ShowModalLogin(true));
   }
   const handleOk = () => {
      dispatch(onOkSignUp(false));
   }
   const handleCancel = () => {
      dispatch(onCancelSignUp(false));
   }

   const onSubmit = (data) => {
      dispatch(signupUser(data));
   }

   const data = {
      a: 1,
      b: 2,
      c: 3
   }
   useEffect(() => {
      // dispatch(signupUser(data));
      // dispatch(loginUser());
   
   }, [])
   
   // useEffect(() => {
   //    effect
   //    return () => {
   //       dispatch(clearState());
   //    }
   // }, []);

   // useEffect(() => {
   //   if (isSucess) {
   //     dispatch(clearState());
   //     history.push("/");
   //   }

   //   if (isError) {
   //     toast.error(errorMessage);
   //     dispatch(clearState());
   //   }
   // }, [isSuccess, isError]);
   return (
      <Modal
         width={"38vw"}
         bodyStyle={{ padding: 0 }}
         closable={false}
         wrapClassName="modal"
         footer={null}
         visible={isShowSignUp}
         onOk={handleOk}
         onCancel={handleCancel}
      >
         <div className="img-login">
            <img src="/logo.png" alt="tree-world-logo" className="logo-login" />
            <img src="images/bg_login.png" alt="bg-login" className="bg-login" />
         </div>
         <h1 className="title-login">Join Us!</h1>
         <form className="content-login">
            <input
               className="content-login_input"
               type="text" id="userName"
               placeholder="Username*"
            />
            <input
               className="content-login_input"
               type="text"  id="phoneNumber"
               placeholder="phoneNumber*"
            />
            <input
               className="content-login_input"
               type="password" id="password"
               placeholder="Password*"
            />
            <button type="submit" onClick="{contact}" className="login-btn_submit">
               sign up
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
               <div onClick={handleShowLogin}>Get Started</div>
            </div>
         </div>
      </Modal>
   )
}
