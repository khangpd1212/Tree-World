import { Col, Form, Input, Row, Select, Tag } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProvince, showTextAddress } from "redux/address/province";
import { getTotals, selectCarts } from "redux/cart";
import { fetchFee, selectFee } from "redux/service/fee";
import { fetchService, selectService } from "redux/service/service";
import { selectUsers } from "redux/user";
import { requests } from "utils/axios";
export default function CartItemPayment() {
  const { Option } = Select;
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const { textAddress } = useSelector(selectProvince);
  const { cartTotalAmount, cartItems } = useSelector(selectCarts);
  const { feeItems } = useSelector(selectFee);
  const { serviceItems } = useSelector(selectService);
  const { userItems } = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchService(textAddress.district_id));
    dispatch(fetchFee(textAddress));
  }, [textAddress]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems]);

    // address từ db
  useEffect(() => {
    requests.getAddressByUser(userItems._id).then((result) => {
      let addressLast = result.slice(-1)[0];
      let addressLocal = JSON.parse(localStorage.getItem("address"));
      if (Object.keys(addressLocal).length === 0) {
        dispatch(
          showTextAddress({
            address: addressLast && addressLast.content,
            district_id: addressLast && addressLast.district_id,
            ward_code: addressLast && addressLast.ward_code,
            name: userItems && userItems.username,
            phone: userItems && userItems.phone_number,
            service_id: textAddress.service_id && textAddress.service_id,
          })
        );
      } else {
        return;
      }
    });
  }, [userItems]);

  const handleServiceChange = (key) => {
    const objectNew = Object.assign({}, textAddress, { service_id: key });
    dispatch(fetchFee(objectNew));
    dispatch(showTextAddress(objectNew));
  };
  return (
    <div className="cartItemPayment">
      <div className="cart__product">
        <Row className="cart__product--title">
          <Col span={10}>
            <h1 className="title__only">Your Product</h1>
          </Col>
          <Col span={14} className="title__content">
            <h2>Color</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Total</h2>
          </Col>
        </Row>
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <h2>Your cart is currently empty</h2>
          </div>
        ) : (
          cartItems &&
          cartItems.map((cartItem, index) => (
            <Row key={index} className="cart__product--main" align="middle">
              <Col span={10} className="main__img">
                <img src={cartItem.product.image[0]} alt="" />
                <h2>{cartItem.product_name}</h2>
              </Col>
              <Col span={14}>
                <Row
                  className="main__list"
                  justify="space-between"
                  align="middle"
                >
                  <Col className="main__list--color">
                    {cartItem.pickColor === "#ffff" ||
                    cartItem.pickColor === "white" ? (
                      <Tag
                        style={{ color: "black" }}
                        color={cartItem.pickColor}
                      >
                        {cartItem.pickColor}
                      </Tag>
                    ) : (
                      <Tag color={cartItem.pickColor}>{cartItem.pickColor}</Tag>
                    )}
                  </Col>
                  <Col className="main__list--price" style={{ margin: 0 }}>
                    <span>${cartItem.product.price}</span>
                  </Col>
                  <Col>
                    <div>{cartItem.quantity}</div>
                  </Col>
                  <Col>
                    <span>${cartItem.product.price * cartItem.quantity}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))
        )}
      </div>
      <div className="product__items--container">
        <Row gutter={30}>
          <Col span={13}>
            <div className="left__items">
              <TextArea
                style={{
                  border: "1px solid #ded9d9",
                  background: "#f7f5f5",
                }}
                rows={6}
                allowClear={true}
                placeholder="Your message"
              />
            </div>
          </Col>
          <Col span={11}>
            <div className="right__items">
              <div className="shipping__title">
                <span>type of shipping:</span>
                <span>shipping fee:</span>
              </div>
              <div className="shipping__inf">
                <Form.Item
                  rules={[
                    {
                      type: "array",
                      required: true,
                      message: "Please select your service!",
                    },
                  ]}
                >
                  <Select placeholder="Service" onChange={handleServiceChange}>
                    {serviceItems &&
                      serviceItems.map((service) => (
                        <Option key={service.service_id}>
                          {service.short_name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <span style={{ marginTop: "-45px" }}>
                  Receive goods on Oct 17 - Dec 11
                </span>
                <span>${feeItems}</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="product__items--bottom">
        <span className="total">
          total: $
          {feeItems ? cartTotalAmount.total + feeItems : cartTotalAmount.total}
        </span>
      </div>
    </div>
  );
}
