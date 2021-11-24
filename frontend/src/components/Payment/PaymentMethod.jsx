import { Radio, Space } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { selectCarts } from "redux/cart";
import { selectFee } from "redux/service/fee";
import { selectProvince } from "redux/address/province";
import { fetchOrders, getOrders } from "redux/order";
import { getOrderDetail } from "redux/order_detail";
import { selectUsers } from "redux/user";
import { ShowModalLogin } from "redux/modal";

export default function PaymentMethod() {
  const { textAddress } = useSelector(selectProvince);
  const { feeItems } = useSelector(selectFee);
  const { cartTotalAmount, cartItems } = useSelector(selectCarts);
  const { userItems } = useSelector(selectUsers);

  const [radio, setRadio] = useState(1);

  const dispatch = useDispatch();
  const feeItem = feeItems ? feeItems.service_fee : 0;

  const onChangeRadio = (e) => {
    setRadio(e.target.value);
  };

  const handleOrder = () => {
    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var orderDate = date + " " + time;

    // nối chuỗi address
    const textAddressChild = textAddress.map(
      (item) =>
        `${item.street}, ${item.ward}, ${item.district}, ${item.province}`
    );

    // lấy data order detail
    const order_detail = cartItems.map((item) => ({
      id_product: item._id,
      quantity: item.quantity,
    }));

    // data để order lên db
    let dataOrder = [
      {
        username: textAddress[0].name
          ? textAddress[0].name
          : userItems.username,
        address: textAddress[0].address
          ? textAddress[0].address
          : textAddressChild.toString(),
        phoneNumber: textAddress[0].phone
          ? textAddress[0].phone
          : userItems.phone_number,
        toTal: cartTotalAmount.total + feeItem,
        status: "Mới tạo",
        idUser: userItems._id,
        idVoucher: 1,
        orderDate: orderDate,
      },
      order_detail,
    ];

    // nếu không đăng nhập thì báo cần đăng nhập
    if (Object.values(userItems).length === 0) {
      dispatch(ShowModalLogin(true));
      toast.error(`You need to login`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    } else {
      dispatch(ShowModalLogin(false));
      dispatch(fetchOrders(dataOrder));
      dispatch(getOrders());
      dispatch(getOrderDetail());
    }
  };
  return (
    <div className="method">
      <div className="method__top">
        <span className="method__top--title">Payment method</span>
        <div className="method__top--wrapper">
          <button className="method__top--btn">Creadit/Debit cart</button>
          <button className="method__top--btn">Electronic Wallet</button>
          <button className="method__top--btn">Cod</button>
        </div>
      </div>
      <hr />
      <div className="method__container">
        <Radio.Group onChange={onChangeRadio} value={radio}>
          <Space direction="vertical">
            <Radio value={1} className="method__wrapper" id="momo">
              <label className="radio_flex" htmlFor="momo">
                <img
                  src="https://play-lh.googleusercontent.com/dQbjuW6Jrwzavx7UCwvGzA_sleZe3-Km1KISpMLGVf1Be5N6hN6-tdKxE5RDQvOiGRg"
                  alt=""
                />
                <div className="method__wrapper--title">
                  <span className="method__wrapper--title_1">MOMO Wallet</span>
                  <span>account balance: $289.054</span>
                </div>
              </label>
            </Radio>
            <Radio value={2} className="method__wrapper" id="bank">
              <label className="radio_flex" htmlFor="bank">
                <img
                  src="https://appoda.com/wp-content/uploads/2015/10/340x340bb-80.png"
                  alt=""
                />
                <div className="method__wrapper--title">
                  <span className="method__wrapper--title_1">Agribank</span>
                  <span>*6877</span>
                </div>
              </label>
            </Radio>
          </Space>
        </Radio.Group>
      </div>
      <div className="method__bottom">
        <div className="method__bottom--content">
          <div className="product__total title-submenu">
            <span>Product total:</span>
            <span>${cartTotalAmount.total}</span>
          </div>
          <div className="shipping__fee title-submenu">
            <span>Shipping fee:</span>
            <span>${feeItem}</span>
          </div>
          <div className="shop__voucher title-submenu">
            <span>Shop Voucher:</span>
            <span>-$4.20</span>
          </div>
          <div className="total__payment title-submenu">
            <span className="total__title">Total Payment:</span>
            <span className="total">$28.80</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="order__now">
        <div className="back__button">
          <Link to="/cart">
            <span>back</span>
          </Link>
        </div>
        <button className="order__button" onClick={handleOrder}>
          Order now
        </button>
      </div>
    </div>
  );
}
