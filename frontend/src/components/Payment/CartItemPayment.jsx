import { Col, Row, Input, Select, Form, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchService, selectService } from "redux/service/service";
import { fetchFee, selectFee } from "redux/service/fee";
import { selectCarts, getTotals } from "redux/cart";
import { selectProvince, showTextAddress } from "redux/address/province";
import { useEffect } from "react";

export default function CartItemPayment() {
  const { Option } = Select;
  const { TextArea } = Input;

  const { textAddress } = useSelector(selectProvince);
  const { cartTotalAmount, cartItems } = useSelector(selectCarts);
  const { feeItems } = useSelector(selectFee);
  const { serviceItems } = useSelector(selectService);
  const dispatch = useDispatch();
  const feeItem = feeItems ? feeItems.service_fee : 0;
  useEffect(() => {
    dispatch(fetchService(textAddress));
    dispatch(fetchFee(textAddress));
  }, [dispatch, textAddress]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  const handleServiceChange = (key) => {
    const objectNew = Object.assign({}, textAddress[0], { service_id: key });
    dispatch(showTextAddress([objectNew]));
    dispatch(fetchFee([objectNew]));
    sessionStorage.setItem("address", JSON.stringify([objectNew]));
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
                <img src={cartItem.image[0]} alt="" />
                <h2>{cartItem.product_name}</h2>
              </Col>
              <Col span={14}>
                <Row
                  className="main__list"
                  justify="space-between"
                  align="middle"
                >
                  <Col className="main__list--color">
                    {cartItem.color[0] === "#ffff" ||
                    cartItem.color[0] === "white" ? (
                      <Tag style={{ color: "black" }} color={cartItem.color[0]}>
                        {cartItem.color[0]}
                      </Tag>
                    ) : (
                      <Tag color={cartItem.color[0]}>{cartItem.color[0]}</Tag>
                    )}
                  </Col>
                  <Col className="main__list--price" style={{ margin: 0 }}>
                    <span>${cartItem.price}</span>
                  </Col>
                  <Col>
                    <div>{cartItem.quantity}</div>
                  </Col>
                  <Col>
                    <span>${cartItem.price * cartItem.quantity}</span>
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
                  <Select
                    // defaultValue={
                    //     serviceItems.find(x => x.service_type_id === 1).short_name
                    // }
                    placeholder="Service"
                    onChange={handleServiceChange}
                  >
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
                <span>${feeItem}</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="product__items--bottom">
        <span className="total">total: ${cartTotalAmount.total + feeItem}</span>
      </div>
    </div>
  );
}
