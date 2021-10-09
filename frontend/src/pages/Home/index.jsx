import { Row, Col, Typography } from "antd";
import "styles/home.scss";
import "styles/button.scss";
import { useDispatch } from "react-redux";
import { setLayoutStatus } from "redux/layout";
const { Title, Paragraph } = Typography;
export default function Home() {
  const dispatch = useDispatch();
  dispatch(setLayoutStatus(false));
  return (
    <>
    {/* Slide */}
      <Row className="slider">
        <Col className="slider-left" xs={24} sm={14}>
          <img src="./images/slider.png" alt="img_slider-left" />
        </Col>
        <Col className="slider-right" xs={24} sm={10}>
          <img src="./images/slider2.png" alt="img_slider-right" />
          <div className="slider-right_title">
            <Title>Make your days feeling goods with beautiful plant</Title>
          </div>
          <div className="slider-right_content">
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing telit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Paragraph>
          </div>
          <button type="submit" class="btn-home">
            See more
          </button>
        </Col>
      </Row>

      {/* product home */}
      <div className="product-wrapper">
        <Row className="h_product">
          <Col className="h_product-title" xs={24} sm={7}>
            <h1>Choose your product from our collection</h1>
          </Col>
          <Col className="h_product-header" xs={24} sm={10}>
            <div className="h_product-header_flex">
              <div>All</div>
              <div>Somethings</div>
              <div>Somethings</div>
              <div>Somethings</div>
            </div>
          </Col>
        </Row>
        <Row className="h_product-main" wrap={false} justify="space-between" gutter={[16, 16]}>
          <Col className="h_product-flex_wrap" xs={16} sm={6}>
            <img src="/images/img_product.png" alt="img_product" />
            <div className="h_product-flex_wrap-content">
              <p>lorem ipsum</p>
              <span>$ 25.00</span>
            </div>
          </Col>
          <Col className="h_product-flex_wrap" xs={16} sm={6}>
            <img src="/images/img_product.png" alt="img_product" />
            <div className="h_product-flex_wrap-content">
              <p>lorem ipsum</p>
              <span>$ 25.00</span>
            </div>
          </Col>
          <Col className="h_product-flex_wrap" xs={16} sm={6}>
              <p>lorem ipsum</p>
              <span>$ 25.00</span>
          </Col>
          <Col className="h_product-flex_wrap" xs={16} sm={6}>
            <img src="/images/img_product.png" alt="img_product" />
            <div className="h_product-flex_wrap-content">
              <p>lorem ipsum</p>
              <span>$ 25.00</span>
            </div>
          </Col>
          <Col className="h_product-flex_wrap" xs={16} sm={6}>
            <img src="/images/img_product.png" alt="img_product" />
            <div className="h_product-flex_wrap-content">
              <p>lorem ipsum</p>
              <span>$ 25.00</span>
            </div>
          </Col>
          <Col className="h_product-flex_wrap" xs={16} sm={6}>
            <img src="/images/img_product.png" alt="img_product" />
            <div className="h_product-flex_wrap-content">
              <p>lorem ipsum</p>
              <span>$ 25.00</span>
            </div>
          </Col>
          <Col className="h_product-flex_wrap" xs={16} sm={6}>
            <img src="/images/img_product.png" alt="img_product" />
            <div className="h_product-flex_wrap-content">
              <p>lorem ipsum</p>
              <span>$ 25.00</span>
            </div>
          </Col>
          <Col className="h_product-flex_wrap" xs={16} sm={6}>
            <img src="/images/img_product.png" alt="img_product" />
            <div className="h_product-flex_wrap-content">
              <p>lorem ipsum</p>
              <span>$ 25.00</span>
            </div>
          </Col>
        </Row>
        <div className="h_product-button">
          <button class="btn-home" type="submit">All product &gt;&gt;</button>
        </div>
      </div>

      {/* detail product hot */}
      
    </>
  );
}
