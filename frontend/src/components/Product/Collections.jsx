import { Col, Row } from "antd";
import React from "react";

function Collections() {
  return (
    <section className="product__collections">
      <div className="product__collections--mobileHidden">
        <Row justify="center" align="middle" gutter={24}>
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
        <Row justify="center" gutter={16}>
          <Col xs={24} sm={9} md={8} lg={8} xl={8}>
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
          <Col xs={24} sm={15} md={8} lg={8} xl={8}>
            <div className="product__collections--item product__collections--mobileVisible--sm">
              <img src="/images/product-banner-3.png" alt="banner1" />
            </div>
            <div className="product__collections--item product__collections--mobileVisible--plus">
              <img src="/images/product-banner--sm-3.png" alt="banner1" />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default Collections;
