import {
  CheckCircleFilled,
  FacebookFilled,
  InstagramFilled,
  MessageFilled,
  ShoppingCartOutlined,
  SkypeFilled,
  SmileFilled,
  StarFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";
import { Col, Radio, Row } from "antd";
import BreadCrumb from "components/Base/BreadCrumb";
import SliderProductComp from "components/Home/SliderProductComp";
import FormSearch from "components/Product/FormSearch";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { addItemToCart } from "redux/cart";
import { setLayoutStatus } from "redux/layout";
import { ShowModalLogin } from "redux/modal";
import { detailProduct, selectProducts } from "redux/product";
import { selectUsers } from "redux/user";
import "styles/detail.scss";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../node_modules/slick-carousel/slick/slick.css";

export default function Detail() {
  const dispatch = useDispatch();
  dispatch(setLayoutStatus(true));
  const history = useHistory();
  const { id } = useParams();
  const { product } = useSelector(selectProducts);

  console.log(id);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(null);
  const { userItems } = useSelector(selectUsers);
  const { productList } = useSelector(selectProducts);
  useEffect(() => {
    if (id) {
      dispatch(detailProduct(id));
    } else {
      history.push("/");
    }
    product.color && setColor(product.color[0]);
  }, [dispatch, id, history]);
  console.log(product);

  console.log(color);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const increaseQty = () => {
    setQty(qty + 1);
  };
  const decreaseQty = () => {
    setQty(qty - 1);
  };
  const handleAddToCart = () => {
    if (Object.values(userItems).length === 0) {
      dispatch(ShowModalLogin(true));
      toast.error(`You need to login`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    } else {
      dispatch(ShowModalLogin(false));
      dispatch(
        addItemToCart({ product: product, quantity: qty, pickColor: color })
      );
    }
  };
  return (
    <div className="detail">
      <BreadCrumb page="product" item={product} />
      <FormSearch />
      <Row className="pro">
        {/* hinh anh san pham */}
        <Col className="avtpro" xs={24} sm={12}>
          <img src={product.image && product.image[0]} alt="" />

          {/* hinh lien quan */}
          <Col className="image">
            <div className="imageCon">
              <img src="/images/sp1.png" alt="" />
            </div>
            <div className="imageCon">
              <img src="/images/sp1.png" alt="" />
            </div>
            <div className="imageCon">
              <img src="/images/sp1.png" alt="" />
            </div>
          </Col>
        </Col>
        {/* thong tin san pham */}
        <Col className="infor" xs={24} sm={12}>
          <div className="Category">
            <div className="hrCategory"></div>
            <p className="succulent">{product.product_name}</p>
          </div>
          <div className="New_collection">
            <div className="newnewCollect">
              <div className="hrNewCollect"></div>
            </div>
            <p className="price">
              $<span>{product.price}</span>
            </p>
          </div>
          {/* màu số lượng  */}
          <div className="color_quantity">
            <div className="color">
              <p>color</p>
              <Radio.Group
                defaultValue={product.color && product.color[0]}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              >
                {product.color &&
                  product.color.map((item, index) => (
                    <Radio.Button
                      key={index}
                      className="color__item"
                      style={{ backgroundColor: item }}
                      value={item}
                    ></Radio.Button>
                  ))}
              </Radio.Group>
            </div>
            <span className="textQuantyti">quantity</span>
            <div className="quantity">
              {qty > 1 ? (
                <button onClick={decreaseQty} className="btn1">
                  -
                </button>
              ) : (
                <button disabled className="btn1">
                  -
                </button>
              )}
              <h3 className="btn2">{qty}</h3>
              {qty < product.inventory ? (
                <button onClick={increaseQty} className="btn3">
                  +
                </button>
              ) : (
                <button disabled className="btn3">
                  +
                </button>
              )}
            </div>
          </div>
          {/* chia sẻ  */}
          <div className="stock">
            <p>
              {" "}
              {<CheckCircleFilled className="iconV" />}
              {product.inventory} in stock
            </p>
            <p>
              SHARE NOW: <MessageFilled className="icon" />{" "}
              <FacebookFilled className="icon" />{" "}
              <InstagramFilled className="icon" />{" "}
              <SkypeFilled className="icon" />{" "}
              <TwitterCircleFilled className="icon" />{" "}
            </p>
          </div>
          <div className="footerInfor">
            <div>
              <button className="btn" onClick={handleAddToCart}>
                {" "}
                <ShoppingCartOutlined className="Cart" />
                ADD TO CART
              </button>
              <button className="btn">BUY NOW</button>
            </div>
          </div>
        </Col>
        {/* thong tin san pham  */}
        <Col className="textD" xs={24}>
          <div className="hrtext"></div>
          <span>{product.description}</span>
          <ul>
            <li>+ Dolor sit amet et dolore magna.</li>
            <li>+ Consectetur adipiscing elit, sed do eiusmod tempor.</li>
            <li>+ 1914 translation by H. Rackham.</li>
          </ul>
        </Col>
        <Col className="proCmt" xs={24}>
          <div className="hrCmt"></div>
        </Col>
        <Col className="boxStar" xs={24} sm={15}>
          <div className="contaistar">
            <div className="numberStar">
              {" "}
              <p>4.9/5</p>
            </div>
            <div className="btnStar">
              <button>ALL</button>
              <button>5 STAR (750)</button>
              <button>4 STAR (58)</button>
              <button>3 STAR (13)</button>
              <button>2 STAR (5)</button>
              <button>1 STAR (2)</button>
              <button>ALL COMMENT (616)</button>
            </div>
          </div>
          {/* <div className="input__comment">
            <Input.TextArea rows={5} placeholder="Writting your comment..." />
            <Button>Comment</Button>
          </div> */}
          <div className="commnet">
            <div className="itemComment">
              <div className="avt_name">
                <div>
                  <SmileFilled className="avt" />
                </div>
                <div className="name">
                  <h3>tnu_yeulinhnhieu</h3>
                  <div className="star">
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                  </div>
                </div>
              </div>
              <div className="textCommnet">
                <h4>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  accusantium, labore nam obcaecati asperiores nihil officiis
                  earum voluptate maiores sed?
                </h4>
              </div>
              <div className="hritemComment"></div>
            </div>
            <div className="itemComment">
              <div className="avt_name">
                <div>
                  <SmileFilled className="avt" />
                </div>
                <div className="name">
                  <h3>tnu_yeulinhnhieu</h3>
                  <div className="star">
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                  </div>
                </div>
              </div>
              <div className="textCommnet">
                <h4>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  accusantium, labore nam obcaecati asperiores nihil officiis
                  earum voluptate maiores sed?
                </h4>
              </div>
              <div className="hritemComment"></div>
            </div>
            <div className="itemComment">
              <div className="avt_name">
                <div>
                  <SmileFilled className="avt" />
                </div>
                <div className="name">
                  <h3>tnu_yeulinhnhieu</h3>
                  <div className="star">
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                  </div>
                </div>
              </div>
              <div className="textCommnet">
                <h4>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  accusantium, labore nam obcaecati asperiores nihil officiis
                  earum voluptate maiores sed?
                </h4>
              </div>
              <div className="hritemComment"></div>
            </div>
            <div className="itemComment">
              <div className="avt_name">
                <div>
                  <SmileFilled className="avt" />
                </div>
                <div className="name">
                  <h3>tnu_yeulinhnhieu</h3>
                  <div className="star">
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                  </div>
                </div>
              </div>
              <div className="textCommnet">
                <h4>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  accusantium, labore nam obcaecati asperiores nihil officiis
                  earum voluptate maiores sed?
                </h4>
              </div>
              <div className="hritemComment"></div>
            </div>
          </div>
        </Col>
        <Col className="voucher" xs={24} sm={8}>
          <div>
            <p>SHOP DISCOUNT</p>
            <div className="voucherItem">
              <div className="voucherMain">
                <h4>15% off</h4>
                <p>maximum $5.00</p>
                <h5>20/09/2021-15/10/2021</h5>
              </div>
              <div className="voucherAdd">
                <button>SAVE</button>
              </div>
            </div>
            <div className="voucherItem">
              <div className="voucherMain">
                <h4>15% off</h4>
                <p>maximum $5.00</p>
                <h5>20/09/2021-15/10/2021</h5>
              </div>
              <div className="voucherAdd">
                <button>SAVE</button>
              </div>
            </div>
          </div>
          <div className="hotSelling">
            <p>HOT SELLING</p>
            <div className="img">
              <img src="./images/product3.png" alt="" />
            </div>
          </div>
        </Col>

        <Col className="aboveSlide">
          <div className="aboveSlide_Right"></div>
          <div className="aboveSlide_Mid">You Might Also Like</div>
          <div className="aboveSlide_Left"></div>
        </Col>
        <Col className="slidePro">
          <div>
            <Slider className="h_product-main" {...settings}>
              {productList &&
                productList.map((productItem, index) => (
                  <SliderProductComp key={index} product={productItem} />
                ))}
            </Slider>
          </div>
        </Col>
      </Row>
    </div>
  );
}

function onChange(a, b, c) {
  console.log(a, b, c);
}
