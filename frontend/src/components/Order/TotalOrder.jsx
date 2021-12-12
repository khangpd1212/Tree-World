import { Row, Col, Space } from "antd";
import { useState, useEffect } from "react";
export default function TotalOrder(data) {
  const [orderTotal, setOrderTotal] = useState(0);

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
    <Space direction="vertical" size={[0, 14]} style={{ width: "100%" }}>
      <Row justify="space-between" align="center">
        <Col className="title">Subtotal</Col>
        <Col className="content">${orderTotal.total}</Col>
      </Row>
      <Row justify="space-between" align="center">
        <Col className="title">Discount</Col>
        <Col className="content">-$999</Col>
      </Row>
      <Row justify="space-between" align="center" style={{ fontWeight: 600 }}>
        <Col className="title">Total</Col>
        <Col className="content">$999</Col>
      </Row>
    </Space>
  );
}
