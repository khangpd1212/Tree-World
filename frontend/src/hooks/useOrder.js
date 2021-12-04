import { useDispatch, useSelector } from "react-redux";
import { selectProvince } from "redux/address/province";
import { clearCart, getTotals, selectCarts } from "redux/cart";
import { fetchOrders } from "redux/order";
import { fetchFee } from "redux/service/fee";

export default function useOrder() {
  const { textAddress } = useSelector(selectProvince);
  const { cartItems } = useSelector(selectCarts);
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(window.location.search);
  const resultCode = queryParams.get("resultCode");

  const handleOrder = async (userItem) => {

    let addressChild = textAddress.province
      ? `${textAddress.street}, ${textAddress.ward}, ${textAddress.district}, ${textAddress.province}`
      : "";

    let addressLocal = JSON.parse(localStorage.getItem("address"));
    let objectNew = {
      service_id: addressLocal.service_id,
      district_id: addressLocal.district_id,
      ward_code: addressLocal.ward_code,
    };
    const getTotal = await dispatch(getTotals());
    const total = getTotal.payload.total;
    const getFee = await dispatch(fetchFee(objectNew));
    const fee = Math.round(getFee.payload / 10000);

    const data_detail = cartItems.map((item) => ({
      id_product: item.product._id,
      quantity: item.quantity,
      color: item.pickColor,
    }));
    const data_order = {
      username: textAddress.name,
      address: textAddress.province ? addressChild : textAddress.address,
      phoneNumber: textAddress.phone,
      toTal: total + fee,
      status: resultCode == 0 ? "Payment Success" : "Pending",
      idUser: userItem._id,
      idVoucher: 1,
    };
    let dataOrder = [data_order, data_detail];
    
    if (resultCode == 0 || !resultCode) {
      const response = await dispatch(fetchOrders(dataOrder));
      dispatch(clearCart());
      return response.payload;
    } else {
      return;
    }
  };

  return { handleOrder, resultCode }
}
