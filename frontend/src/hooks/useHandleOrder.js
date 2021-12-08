import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { selectProvince } from "redux/address/province";
import { selectCarts } from "redux/cart";
import { ShowModalLogin } from "redux/modal";
import { fetchMomo } from "redux/order";
import { selectFee } from "redux/service/fee";
import { selectUsers } from "redux/user";

export default function useHandleOrder() {
  const { textAddress } = useSelector(selectProvince);
  const { feeItems } = useSelector(selectFee);
  const { cartTotalAmount, cartItems } = useSelector(selectCarts);
  const { userItems } = useSelector(selectUsers);

  const dispatch = useDispatch();
  const history = useHistory();
  const feeItem = feeItems ? feeItems : 0;

  const handleOrder = (radio, disabled) => {
    // nếu không đăng nhập thì báo cần đăng nhập
    if (Object.values(userItems).length === 0) {
      dispatch(ShowModalLogin(true));
      toast.error(`You need to login`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    } else if (!cartItems[0] || !feeItems) {
      toast.error(`You are not buying or payment method`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    } else {
      dispatch(ShowModalLogin(false));

      // lấy data order detail
      const data_momo = {
        id_order: new Date().getTime(),
        toTal: cartTotalAmount.total + feeItem,
        extraData: `username=${textAddress.name}&phoneNumber=${textAddress.phone}&address=${textAddress.address}`,
        orderInfo: "TreeWorld",
      };
      // thanh toán bằng momo
      if (radio === 1 && disabled === false) {
        // data để order lên db
        dispatch(fetchMomo(data_momo)).then((res) => {
          return (window.location = res.payload);
        });
      }
      // thanh toán bằng ship cod
      else if(disabled === true){
        return history.push("/result")
      }
    }
  };
  return { handleOrder }
}