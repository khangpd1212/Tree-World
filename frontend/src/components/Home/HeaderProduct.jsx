import React from "react";
import { Col, Row } from "antd";
import "styles/Home/HeaderProduct.scss";
import { useDispatch } from "react-redux";
import { setFilterStatus } from "redux/layout";
import { setBestSeller, setHot, sortDefault } from "redux/filter";

export default function HeaderProduct() {
  const dispatch = useDispatch();
  return (
    <Row className="h_product">
      <Col className="h_product-title" xs={24} sm={10} md={8}>
        <h1>Choose your product from our collection</h1>
      </Col>
      <Col className="h_product-header" xs={24} sm={10}>
        <div className="h_product-header_flex">
          <div
            onClick={() => {
              dispatch(setFilterStatus());
              dispatch(sortDefault());
            }}
          >
            new
          </div>
          <div
            onClick={() => {
              dispatch(setFilterStatus());
              dispatch(setHot());
            }}
          >
            hot
          </div>
          <div
            onClick={() => {
              dispatch(setFilterStatus());
              dispatch(setBestSeller());
            }}
          >
            best seller
          </div>
          <div>favorite</div>
        </div>
      </Col>
    </Row>
  );
}
