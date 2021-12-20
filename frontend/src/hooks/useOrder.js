import { useDispatch, useSelector } from "react-redux";
import { selectProvince } from "redux/address/province";
import { getTotals, selectCarts, clearCart } from "redux/cart";
import { fetchOrders } from "redux/order";
import { fetchFee } from "redux/service/fee";
import { fetchGetUser, loadVoucher } from "redux/user";
import { requests } from "utils/axios";

export default function useOrder() {
  const { textAddress } = useSelector(selectProvince);
  const { cartItems } = useSelector(selectCarts);
  const dispatch = useDispatch();


  const queryParams = new URLSearchParams(window.location.search);
  const resultCode = queryParams.get("resultCode");

  const handleOrder = async (userItem, voucherList) => {

    let addressChild = textAddress.province
      ? `${textAddress.street}, ${textAddress.ward}, ${textAddress.district}, ${textAddress.province}`
      : textAddress.address;

    let objectNew = {
      service_id: textAddress.service_id,
      district_id: textAddress.district_id,
      ward_code: textAddress.ward_code,
    };
    const getTotal = await dispatch(getTotals());
    const total = getTotal.payload.total;
    const getFee = await dispatch(fetchFee(objectNew));
    const fee = Math.round(getFee.payload / 10000);

    // voucher
    const arrVoucher = Object.assign([], userItem.id_voucher);

    const vouchers =
      arrVoucher && arrVoucher.length > 0
        ? arrVoucher.map((item) =>
            Object.assign({}, voucherList.filter((i) => i._id === item)[0])
          )
        : [];

    const discounts =
      vouchers && vouchers.length > 0
        ? vouchers.map((item) =>
            Object.assign(
              {},
              {
                idVoucher: item._id,
                value:
                  (item.percent * total) / 100 > item.maximum
                    ? item.maximum
                    : (item.percent * total) / 100,
              }
            )
          )
        : [];

    const currentDiscount =
      discounts && discounts.length > 0
        ? discounts.reduce((prev, current) =>
            prev.value > current.value ? prev : current
          )
        : null;

    //data order
    const data_order =
      arrVoucher && arrVoucher.length > 0
        ? {
            username: textAddress.name,
            address: addressChild,
            phoneNumber: textAddress.phone,
            toTal: total + fee - currentDiscount.value,
            status: resultCode == 0 ? "Payment Success" : "Pending",
            idUser: userItem._id,
            activatedVoucher: true,
            idVoucher: currentDiscount.idVoucher,
          }
        : {
            username: textAddress.name,
            address: addressChild,
            phoneNumber: textAddress.phone,
            toTal: total + fee,
            status: resultCode == 0 ? "Payment Success" : "Pending",
            idUser: userItem._id,
          };
    const data_detail = cartItems.map((item) => ({
      id_product: item.product._id,
      quantity: item.quantity,
      color: item.pickColor,
    }));
    const data_inventory = cartItems.map((item) => ({
      id_product: item.product._id,
      quantity: item.quantity,
      inventory: item.product.inventory,
      sold: item.product.sold,
      token: userItem.accessToken,
    }));
    const index = arrVoucher.indexOf(currentDiscount?.idVoucher);
    if (index > -1) {
      arrVoucher.splice(index, 1);
    }
    const data_user = {
      id_voucher: arrVoucher,
    };
    let dataOrder = [data_order, data_detail, data_inventory];

    console.log(userItem)
    // nếu momo thanh toán thành công hoặc thanh toán bằng ship cod
    if (resultCode == 0 || !resultCode) {
      const response = await dispatch(fetchOrders(dataOrder));
      dispatch(clearCart());
      requests.editUser(userItem.accessToken, data_user, userItem._id);
      dispatch(loadVoucher(arrVoucher));
      dispatch(fetchGetUser());
      return response.payload;
    } else {
      return "No id order";
    }
  };

  return { handleOrder, resultCode };
}
