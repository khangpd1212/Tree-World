import { Col, Row } from "antd";
import React from "react";

function Collections() {
  return (
    <section className="product__collections">
      <div className="product__collections--mobileHidden">
        <Row justify="center" align="middle">
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <div className="product__collections--item">
              <img src="/images/product-banner-1.png" alt="banner1" />
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <div className="product__collections--item">
              <img src="/images/product-banner-2.png" alt="banner1" />
            </div>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <div className="product__collections--item">
              <img src="/images/product-banner-3.png" alt="banner1" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="product__collections--mobileVisible">
        <Row justify="center" align="middle">
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <Row>
              <Col span={24}>
                <div className="product__collections--item">
                  <img src="/images/product-banner-1.png" alt="banner1" />
                </div>
              </Col>
              <Col span={24}>
                <div className="product__collections--item">
                  <img src="/images/product-banner-2.png" alt="banner1" />
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={16} md={8} lg={8} xl={8}>
            <div className="product__collections--item">
              <img src="/images/product-banner-3.png" alt="banner1" />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default Collections;
