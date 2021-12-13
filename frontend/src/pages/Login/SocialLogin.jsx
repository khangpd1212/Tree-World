import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { ShowModalLogin } from "redux/modal";
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
      return dispatch(fetchLogin(body)).then((res) => {
        if (Object.values(res.payload).length > 0) {
          dispatch(ShowModalLogin(false));
        }
      });
    }

    requests.fetchRegister(body).then(() => {
      dispatch(ShowModalLogin(false));
      dispatch(fetchLogin(body));
    });
  };
  const responseFacebook = async (response) => {
    if (response.name === undefined && response.accessToken === undefined) {
      return;
    }
    const body = {
      user: {
        name: response.name,
      },
      token: response.accessToken,
    };
    console.log(body);
  };
  return (
    <>
      <div className="icon-login">
        <FacebookLogin
          appId="288725263209126"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <img src="../../images/icon-fb_login.png" alt="icon__face" />
            </button>
          )}
        />
        {/* <div>
          <img
            src="../../images/icon-twitter_login.png"
            alt="icon-twitter_login"
          />
        </div> */}
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
    </>
  );
}
