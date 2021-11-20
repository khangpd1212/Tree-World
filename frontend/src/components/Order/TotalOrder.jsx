import { Row, Col, Space } from "antd";
export default function TotalOrder() {

    return (
      <Space direction="vertical" size={[20, 0]}  style={{ width: "100%", fontSize: 14 }}>
        <Row justify="space-between" align="center">
          <Col className="title">Subtotal</Col>
          <Col className="content">$999</Col>
        </Row>
        <Row justify="space-between" align="center">
          <Col className="title">Discount</Col>
          <Col className="content">-$999</Col>
        </Row>
        <Row justify="space-between" align="center" style={{fontWeight: 600}}>
          <Col className="title">Total</Col>
          <Col className="content">$999</Col>
        </Row>
      </Space>
    );
}
