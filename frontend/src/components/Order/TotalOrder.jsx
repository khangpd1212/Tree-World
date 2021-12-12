import { Row, Col, Space } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectVouchers } from "redux/voucher";
export default function TotalOrder(data) {
  const [orderTotal, setOrderTotal] = useState(0);
  const { voucherList } = useSelector(selectVouchers);
  const voucher = data.activate
    ? Object.assign(
        {},
        voucherList.filter((item) => item._id === data.idVoucher)[0]
      )
    : null;
  useEffect(() => {
    setOrderTotal(
      data.order.reduce(
        (orderTotal, item) => {
          const { price, quantity } = item;
          const itemTotal = price * quantity;
          orderTotal.total += itemTotal;
          return orderTotal;
        },
        {
          total: 0,
        }
      )
    );
  }, [data]);

  return (
    <>
      {data.activate ? (
        <Space direction="vertical" size={[0, 14]} style={{ width: "100%" }}>
          <Row justify="space-between" align="center">
            <Col className="title">Total</Col>
            <Col className="content">${orderTotal.total}</Col>
          </Row>
          <Row justify="space-between" align="center">
            <Col className="title">Discount</Col>
            <Col className="content">
              -$
              {(voucher.percent * orderTotal.total) / 100 > voucher.maximum
                ? voucher.maximum
                : (voucher.percent * orderTotal.total) / 100}
            </Col>
          </Row>
          <Row
            justify="space-between"
            align="center"
            style={{ fontWeight: 600 }}
          >
            <Col className="title">Subtotal</Col>
            <Col className="content">${data.total}</Col>
          </Row>
        </Space>
      ) : (
        <Space direction="vertical" size={[0, 14]} style={{ width: "100%" }}>
          <Row justify="space-between" align="center">
            <Col className="title">Total</Col>
            <Col className="content">${orderTotal.total}</Col>
          </Row>

          <Row
            justify="space-between"
            align="center"
            style={{ fontWeight: 600 }}
          >
            <Col className="title">Subtotal</Col>
            <Col className="content">${data.total}</Col>
          </Row>
        </Space>
      )}
    </>
  );
}
