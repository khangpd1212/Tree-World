import { Col, Layout, Row, Input, Button } from "antd";
import React from "react";
import "styles/footer.scss";
const { Footer } = Layout;
function BaseFooter() {
  return (
    <Footer>
      <Row justify="center" align="top">
        <Col span={24}>
          <div className="subscribe__section">
            <Row justify="center" align="middle">
              <Col xs={24} sm={24} md={12} lg={16} xl={16}>
                <div className="subscribe__section--content">
                  <h3>
                    <strong>subscribe</strong> to our special offers
                  </h3>
                  <p>lorem ipsum dolor sit amet, consectetur, adipiscing ut</p>
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                <div className="subscribe__section--form">
                  <Input placeholder="Your email" />
                  <Button>
                    <img src="/images/arow-right-light.png" alt="arrow-right" />
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={24}>
          <div className="footer__section">
            <Row>
              <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                <div className="footer__section--logo">
                  <img src="/logo.png" alt="logo" />
                  <p>
                    © 2021 <br /> privacy policy
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <div className="footer__section--address">
                  <p>
                    usa - los angeles, 910 east e street, hihi, ca 90744
                    <br />
                    e-mail: mail@gmail.com
                  </p>
                  <p>
                    (+84)<span> 123 456 789</span>
                  </p>
                </div>
                <div className="footer__section--follow visible">
                  <img src="/images/facebook-icon.png" alt="facebook" />

                  <img src="/images/twitter-icon.png" alt="twitter" />

                  <img src="/images/shopee-icon.png" alt="shopee" />

                  <img src="/images/lazada-icon.png" alt="lazada" />
                </div>
              </Col>
              <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                <div className="footer__section--schedule">
                  <h3>
                    tuesday - friday
                    <br />
                    <span>8:00 to 21:00</span>
                  </h3>
                  <h3>
                    saturday & sunday
                    <br />
                    <span>8:00 to 12:00</span>
                  </h3>
                  <p>closed monday</p>
                </div>
                <div className="footer__section--follow hidden">
                  <img src="/images/facebook-icon.png" alt="facebook" />

                  <img src="/images/twitter-icon.png" alt="twitter" />

                  <img src="/images/shopee-icon.png" alt="shopee" />

                  <img src="/images/lazada-icon.png" alt="lazada" />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Footer>
  );
}

export default BaseFooter;
