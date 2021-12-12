import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import {
  ShowModalLogin
} from "redux/modal";
import { fetchGetUser, fetchLogin } from "redux/user";
import { requests } from "utils/axios";
export default function SocialLogin() {
  const dispatch = useDispatch();

  const responseGoogle = async (response) => {
    const body = {
      username: response.profileObj.name,
      email: response.profileObj.email,
      password: process.env.REACT_APP_PASS,
    };

    const userList = await dispatch(fetchGetUser());

    const findEmail = await userList.payload.find(
      (item) => item.email === body.email
    );

    if (findEmail) {
      dispatch(ShowModalLogin(false));
      return dispatch(fetchLogin(body));
    }

    requests.fetchRegister(body).then(() => {
      dispatch(ShowModalLogin(false));
      dispatch(fetchLogin(body));
    });
  };

  return (
    <>
      <div className="icon-login">
        <div>
          <img src="../../images/icon-fb_login.png" alt="icon__google" />
        </div>
        <div>
          <img
            src="../../images/icon-twitter_login.png"
            alt="icon-twitter_login"
          />
        </div>
        <div>
          <GoogleLogin
            clientId="471610999621-tje10abkirb8jdjn248k79e5a47tpqij.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <img src="../../images/icon-gg_login.png" alt="icon__google" />
              </button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </>
  );
}
