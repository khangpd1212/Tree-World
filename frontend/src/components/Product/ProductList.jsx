import { Col, Row } from "antd";
import React from "react";
import ProductComponent from "./ProductComponent";

function ProductList() {
  return (
    <div className="product__section--list">
      <Row justify="space-between">
        <ProductComponent
          src="/images/product1.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product2.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product3.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product1.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product2.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product3.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product1.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product2.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product3.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
      </Row>
    </div>
  );
}

export default ProductList;
