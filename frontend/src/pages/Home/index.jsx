import { Row, Col, Typography } from "antd";
import { HeartFilled } from '@ant-design/icons';
import "styles/home.scss";
import "styles/button.scss";
import { useDispatch } from "react-redux";
import { setLayoutStatus } from "redux/layout";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
const { Title, Paragraph } = Typography;

export default function Home() {
  const dispatch = useDispatch();
  dispatch(setLayoutStatus(false));

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    dots: true,
    appendDots: dots => (
        <ul style={{ width: '90%' }}> {dots} </ul>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  var icon_like={
    fontSize: '2.5vw', 
    color: '#E44343',
  }
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
        </Slider>

        <div className="h_product-button">
          <button class="btn-home" type="submit">All product &gt;&gt;</button>
        </div>
      </div>

      {/* detail product hot */}

    </>
  );
}
