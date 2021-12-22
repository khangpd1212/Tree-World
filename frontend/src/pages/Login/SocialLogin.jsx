import { useDispatch } from "react-redux";
import { ShowModalLogin } from "redux/modal";
import { fetchGetUser, fetchLogin } from "redux/user";
import { requests } from "utils/axios";
import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
} from "config/firebase";
import { signInWithPopup } from "firebase/auth";
export default function SocialLogin() {
  const dispatch = useDispatch();

  const responseGoogle = async () => {
    const userList = await dispatch(fetchGetUser());
    googleAuthProvider.addScope(
      "https://www.googleapis.com/auth/admin.directory.user.readonly"
    );
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const user = result.user;
        const body = {
          username: user.displayName,
          email: user.email,

          
          password: process.env.REACT_APP_PASS,
        };

        const findEmail = userList.payload.find(
          (item) => item.email === body.email
        );

        if (findEmail) {
          return dispatch(fetchLogin(body)).then((res) => {
            if (Object.values(res.payload).length > 0) {
              dispatch(ShowModalLogin(false));
            }
          });
        } else {
          requests.fetchRegister(body).then(() => {
            dispatch(ShowModalLogin(false));
            dispatch(fetchLogin(body));
          });
        }
      })
      .catch((error) => {
        return error;
      });
  };
  const responseFacebook = async () => {};
  return (
    <>
      <div className="icon-login">
        <div onClick={responseFacebook}>
          <img src="../../images/icon-fb_login.png" alt="icon__face" />
        </div>

        <div onClick={responseGoogle}>
          <img src="../../images/icon-gg_login.png" alt="icon-twitter_login" />
        </div>
      </div>
    </>
  );
}
