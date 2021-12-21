import { Col } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function ProductComponent(props) {
  return (
    <Col xs={12} sm={8} md={8} lg={6} xl={6}>
      <div className="product__section--product">
        <div className="product__section--product--img">
          <Link to={`/detail/${props.id}`}>
            <img src={props.src} alt={props.name} />
          </Link>
        </div>
        <div className="product__section--product--content">
          <Link to={`/detail/${props.id}`}>
            <h2>{props.name}</h2>
          </Link>
          <p>${props.price}</p>
        </div>
      </div>
    </Col>
  );
}

export default ProductComponent;
