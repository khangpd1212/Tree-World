import * as CryptoJS from "crypto-js";
import { fetchGetUser, fetchLogin, fetchLoginAdmin } from "redux/user";
import { useDispatch } from "react-redux";

export default function useAutoLogin() {
  const dispatch = useDispatch();

  const autoLogin = async (idUser, isAdmin) => {
    const userData = await dispatch(fetchGetUser());

    const { username, password } = userData.payload.find(
      (item) => idUser === item._id
    );
    const bytes = CryptoJS.AES.decrypt(password, "treeworld");
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (isAdmin === false){
      dispatch(
        fetchLogin({ username: username, password: originalPassword })
      );
    } else if (isAdmin === true){
      dispatch(
        fetchLoginAdmin({ username: username, password: originalPassword })
      );
    }else{
      return
    }
  }
  return { autoLogin }
}
