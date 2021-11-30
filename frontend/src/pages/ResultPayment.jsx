import { Button, Result } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectProvince } from "redux/address/province";
import { getTotals, selectCarts } from "redux/cart";
import { fetchOrders } from "redux/order";
import { fetchFee } from "redux/service/fee";
import { selectUsers } from "redux/user";

export default function ResultPayment() {
  const { textAddress } = useSelector(selectProvince);
  const { cartItems } = useSelector(selectCarts);
  const { userItems } = useSelector(selectUsers);
  const dispatch = useDispatch();

  const [orderId, setOrderId] = useState("");

  const queryParams = new URLSearchParams(window.location.search);
  const resultCode = queryParams.get("resultCode");

  let addressChild = textAddress.province
    ? `${textAddress.street}, ${textAddress.ward}, ${textAddress.district}, ${textAddress.province}`
    : "";
  useEffect(() => {
    const data_detail = cartItems.map((item) => ({
      id_product: item.product._id,
      quantity: item.quantity,
      color: item.pickColor,
    }));

    let addressLocal = JSON.parse(localStorage.getItem("address"));
    let objectNew = {
      service_id: addressLocal.service_id,
      district_id: addressLocal.district_id,
      ward_code: addressLocal.ward_code,
    };

    const actionOrder = async () => {
      const getTotal = await dispatch(getTotals());
      const total = getTotal.payload.total;

      const getFee = await dispatch(fetchFee(objectNew));
      const fee = Math.round(getFee.payload / 10000);

      const data_order = {
        username: textAddress.name,
        address: textAddress.province ? addressChild : textAddress.address,
        phoneNumber: textAddress.phone,
        toTal: total + fee,
        status: resultCode == 0 ? "Payment Success" : "Pending",
        idUser: userItems._id,
        idVoucher: 1,
      };

      let dataOrder = [data_order, data_detail];
      if (resultCode == 0 || !resultCode) {
        const response = await dispatch(fetchOrders(dataOrder));
        setOrderId(response.payload);
      } else {
        return;
      }
    };
    actionOrder();
  }, []);

  return (
    <div>
      {orderId ? (
        <Result
          status={resultCode == 0 || !resultCode ? "success" : "error"}
          title={
            resultCode == 0 || !resultCode
              ? "Order Successfully"
              : "Please buy again"
          }
          subTitle={orderId ? `Order number: ${orderId}` : null}
          extra={[
            <Link to="/product" key="1">
              <Button type="primary" key="buy">
                Buy Again
              </Button>
            </Link>,
          ]}
        />
      ) : null}
    </div>
  );
}
