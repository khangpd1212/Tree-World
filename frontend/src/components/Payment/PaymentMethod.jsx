import { Radio, Space } from "antd";
import useOrderMomo from "hooks/useOrderMomo";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCarts } from "redux/cart";
import { selectFee } from "redux/service/fee";
import { selectUsers } from "redux/user";
import { selectVouchers } from "redux/voucher";
export default function PaymentMethod() {
  const { userItems } = useSelector(selectUsers);
  const { feeItems } = useSelector(selectFee);
  const { cartTotalAmount } = useSelector(selectCarts);
  const { handleOrderMomo } = useOrderMomo();

  const [radio, setRadio] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [disabledLocal, setDisabledLocal] = useState(() =>
    localStorage.getItem("checkDisabledMethod")
  );

  const arrVoucher = Object.assign([], userItems.id_voucher);
  const { voucherList } = useSelector(selectVouchers);
  const vouchers = arrVoucher.map((item) =>
    Object.assign({}, voucherList.filter((i) => i._id === item)[0])
  );
  console.log(vouchers);

  const onChangeRadio = (e) => {
    setRadio(e.target.value);
  };
  const handleBtnMethod = (value) => {
    localStorage.setItem("checkDisabledMethod", value);
    setDisabledLocal(value);
  };
  useEffect(() => {
    disabledLocal === "cod" ? setDisabled(true) : setDisabled(false);

    let cod = document.getElementById("cod");
    let wallet = document.getElementById("wallet");
    if (disabledLocal === "wallet") {
      wallet.style.outline = "1px solid #d64848";
      wallet.style.color = "#d64848";
      cod.style.outline = "1px solid #898989";
      cod.style.color = "#898989";
    } else {
      cod.style.outline = "1px solid #d64848";
      cod.style.color = "#d64848";
      wallet.style.outline = "1px solid #898989";
      wallet.style.color = "#898989";
    }
  }, [disabledLocal]);

  return (
    <div className="method">
      <div className="method__top">
        <span className="method__top--title">Payment method</span>
        <div className="method__top--wrapper">
          <button
            id="wallet"
            className="method__top--btn"
            onClick={() => handleBtnMethod("wallet")}
          >
            Electronic Wallet
          </button>
          <button
            id="cod"
            className="method__top--btn"
            onClick={() => handleBtnMethod("cod")}
          >
            Cod
          </button>
        </div>
      </div>
      <div className="method__container">
        <Radio.Group onChange={onChangeRadio} value={radio}>
          <Space direction="vertical">
            <Radio
              value={1}
              disabled={disabled}
              className="method__wrapper"
              id="momo"
            >
              <label className="radio_flex" htmlFor="momo">
                <img
                  src="https://play-lh.googleusercontent.com/dQbjuW6Jrwzavx7UCwvGzA_sleZe3-Km1KISpMLGVf1Be5N6hN6-tdKxE5RDQvOiGRg"
                  alt=""
                />
                <div className="method__wrapper--title">
                  <span className="method__wrapper--title_1">MOMO Wallet</span>
                  <span>Electronic Wallet</span>
                </div>
              </label>
            </Radio>
            <Radio
              disabled={disabled}
              value={2}
              className="method__wrapper"
              id="bank"
            >
              <label className="radio_flex" htmlFor="bank">
                <img
                  src="https://appoda.com/wp-content/uploads/2015/10/340x340bb-80.png"
                  alt=""
                />
                <div className="method__wrapper--title">
                  <span className="method__wrapper--title_1">Agribank</span>
                  <span>Creadit/Debit Card </span>
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
            <span>${feeItems}</span>
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
      <div className="order__now">
        <div className="back__button">
          <Link to="/cart">
            <span>back</span>
          </Link>
        </div>
        <button
          className="order__button"
          onClick={() => handleOrderMomo(radio, disabled)}
        >
          Order now
        </button>
      </div>
    </div>
  );
}
