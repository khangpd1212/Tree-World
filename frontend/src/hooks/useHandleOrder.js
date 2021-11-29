import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { selectProvince } from "redux/address/province";
import { selectCarts } from "redux/cart";
import { ShowModalLogin } from "redux/modal";
import { fetchMomo, fetchOrders, getOrders, selectOrders } from "redux/order";
import { selectFee } from "redux/service/fee";
import { selectUsers } from "redux/user";

export default function useHandleOrder() {
  const { textAddress } = useSelector(selectProvince);
  const { feeItems } = useSelector(selectFee);
  const { cartTotalAmount, cartItems } = useSelector(selectCarts);
  const { userItems } = useSelector(selectUsers);
  const { loading } = useSelector(selectOrders);

  const dispatch = useDispatch();
  const history = useHistory();
  const feeItem = feeItems ? feeItems : 0;
  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

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

      var today = new Date();
      var date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
      var time =
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds();
      var orderDate = date + " " + time;

      // lấy data order detail
      const data_detail = cartItems.map((item) => ({
        id_product: item.product._id,
        quantity: item.quantity,
        color: item.pickColor,
      }));
      const data_order = {
        username: textAddress.name,
        address: textAddress.address,
        phoneNumber: textAddress.phone,
        toTal: cartTotalAmount.total + feeItem,
        status: "Pending",
        idUser: userItems._id,
        idVoucher: 1,
        orderDate: orderDate,
      };
      const data_momo = {
        toTal: cartTotalAmount.total + feeItem,
        extraData: `username=${textAddress.name}&phoneNumber=${textAddress.phone}&address=${textAddress.address}`,
        orderInfo: "TreeWorld",
      };
      // thanh toán bằng momo
      if (radio === 1 && disabled === false) {
        // data để order lên db
        let dataOrder = [data_order, data_detail, data_momo];
        dispatch(fetchMomo(dataOrder)).then((res) => {
          return (window.location = res.payload);
        });
      }
      // thanh toán bằng ship cod
      else if(disabled === true){
        let dataOrder = [data_order, data_detail];
        dispatch(fetchOrders(dataOrder))
        dispatch(getOrders()).then(res => {
          if (loading === "loaded") {
            return history.push("/result")
          } else {
            return (<div className="spinner--loading">
              <Spin indicator={antIcon} />
            </div>)
          };
        })
      }
    }
  };
  return { handleOrder }
}
