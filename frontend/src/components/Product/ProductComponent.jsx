import { Col } from "antd";
import React from "react";

function ProductComponent(props) {
  return (
    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
      <div className="product__section--product">
        <div className="product__section--product--img">
          <img src={props.src} alt="Product1" />
        </div>
        <div className="product__section--product--content">
          <h2>{props.name}</h2>
          <p>${props.price}</p>
        </div>
      </div>
    </Col>
  );
}

export default ProductComponent;
