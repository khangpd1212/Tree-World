import { Row, Col, Typography } from "antd";
import { HeartFilled } from "@ant-design/icons";
import "styles/home.scss";
import "styles/button.scss";
import { useDispatch } from "react-redux";
import { setLayoutStatus } from "redux/layout";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
// import ModelViewer from 'react-model-viewer';
// const modelPath = 'https://sketchfab.com/3d-models/simple-pot-and-plant-d489a069b49c4451a0fa17130fba4c28';
const { Title, Paragraph } = Typography;

export default function Home() {
  const dispatch = useDispatch();
  dispatch(setLayoutStatus(false));

  var settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          pauseOnHover: true,
          autoplaySpeed: 2000,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          appendDots: (dots) => <ul style={{ width: "90%" }}>{dots}</ul>,
        },
      },
    ],
  };

  var icon_like = {
    fontSize: "2.5vw",
    color: "#E44343",
  };
  return (
    <>
      {/* Slide */}
      <Row className="slider">
        <Col className="slider-left" xs={24} sm={14}>
          <img srcSet="./images/slider.png" alt="img_slider-left" />
        </Col>
        <Col className="slider-right" xs={24} sm={10}>
          <img srcSet="./images/slider2.png" alt="img_slider-right" />
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
          <button type="submit" className="btn-home">
            See more
          </button>
        </Col>
      </Row>

      {/* product home */}
      <div className="product-wrapper">
        <Row className="h_product">
          <Col className="h_product-title" xs={24} sm={10} md={8}>
            <h1>Choose your product from our collection</h1>
          </Col>
          <Col className="h_product-header" xs={24} sm={10}>
            <div className="h_product-header_flex">
              <div>hot</div>
              <div>new</div>
              <div>view</div>
              <div>favorite</div>
            </div>
          </Col>
        </Row>

        <Slider className="h_product-main" {...settings}>
          <div className="h_product-flex">
            <div className="h_product-flex_hover">
              <img srcSet="/images/product1.png" alt="img_product" />
              <div className="h_product-flex_icon">
                <a href="#" className="icon-like">
                  <HeartFilled style={icon_like} />
                </a>
              </div>
            </div>
            <div className="h_product-flex_content">
              <p>lorem ipsum</p>
              <span>$ 25.00</span>
            </div>
          </div>
          <div className="h_product-flex">
            <div className="h_product-flex_hover">
              <img srcSet="/images/product2.png" alt="img_product" />
              <div className="h_product-flex_icon">
                <a href="#" className="icon-like">
                  <HeartFilled style={icon_like} />
                </a>
              </div>
            </div>
            <div className="h_product-flex_content">
              <p>lorem ipsum</p>
              <span>$ 25.00</span>
            </div>
          </div>
          <div className="h_product-flex">
            <div className="h_product-flex_hover">
              <img srcSet="/images/product3.png" alt="img_product" />
              <div className="h_product-flex_icon">
                <a href="#" className="icon-like">
                  <HeartFilled style={icon_like} />
                </a>
              </div>
            </div>
            <div className="h_product-flex_content">
              <p>lorem ipsum</p>
              <span>$ 25.00</span>
            </div>
          </div>
          <div className="h_product-flex">
            <div className="h_product-flex_hover">
              <img srcSet="/images/product1.png" alt="img_product" />
              <div className="h_product-flex_icon">
                <a href="#" className="icon-like">
                  <HeartFilled style={icon_like} />
                </a>
              </div>
            </div>
            <div className="h_product-flex_content">
              <p>lorem ipsum</p>
              <span>$ 25.00</span>
            </div>
          </div>
          <div className="h_product-flex">
            <div className="h_product-flex_hover">
              <img srcSet="/images/product1.png" alt="img_product" />
              <div className="h_product-flex_icon">
                <a href="#" className="icon-like">
                  <HeartFilled style={icon_like} />
                </a>
              </div>
            </div>
            <div className="h_product-flex_content">
              <p>lorem ipsum</p>
              <span>$ 25.00</span>
            </div>
          </div>
        </Slider>

        <div className="h_product-button">
          <button className="btn-home" type="submit">
            All product &gt;&gt;
          </button>
        </div>
      </div>

      {/* introduce product */}
      <Row className="section_hot">
        <Col className="section_hot__left" md={12}>
          <div className="section_hot__img">
            {/* <ModelViewer type="gtlf" src={modelPath} /> */}
            {/* <model-viewer id="reveal" loading="eager" camera-controls auto-rotate src="https://sketchfab.com/3d-models/simple-pot-and-plant-d489a069b49c4451a0fa17130fba4c28" alt="A 3D model of a shishkebab"></model-viewer> */}
          </div>
            <div className="section_hot__top">
            
            </div>
        </Col>
      </Row>
    </>
  );
}
