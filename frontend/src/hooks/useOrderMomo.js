import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { selectProvince } from "redux/address/province";
import { selectCarts } from "redux/cart";
import { ShowModalLogin } from "redux/modal";
import { fetchMomo } from "redux/order";
import { selectFee } from "redux/service/fee";

export default function useOrderMomo() {
  const { textAddress } = useSelector(selectProvince);
  const { feeItems } = useSelector(selectFee);
  const { cartItems } = useSelector(selectCarts);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleOrderMomo = (radio, disabled, total) => {

    // nếu không đăng nhập thì báo cần đăng nhập
    if (!cartItems[0] || !feeItems) {
      toast.error(`You are not buying or payment method`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    } else {
      dispatch(ShowModalLogin(false));

      // lấy data order detail
      const data_momo = {
        id_order: new Date().getTime(),
        toTal: total,
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
      else if (disabled === true) {
        return history.push("/result")
      }
    }
  };
  return { handleOrderMomo }
}
