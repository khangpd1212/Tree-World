import { Row, Col, Typography, Radio } from "antd";
import { Button, Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setLayoutStatus } from "redux/layout";
import FormSearch from "components/Product/FormSearch";
import BreadCrumb from "components/Base/BreadCrumb";
import "styles/detail.scss";

export default function Detail() {
  const dispatch = useDispatch();
  dispatch(setLayoutStatus(true));
  return (
    <div className="detail">
      <BreadCrumb page="product" item="detail product" />
      <FormSearch />
      <Row className="pro">
        {/* hinh anh san pham */}
        <Col className="avtpro" xs={24} sm={12}>
          <img src="/images/sp1.png" alt="" />
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
        {/* thon tin san pham */}
        <Col className="infor" xs={24} sm={12}>
          <div className="Category">
            <div className="hrCategory">
            </div>
            <p className="succulent">Succulent <br></br> plant</p>
          </div>
          <div className="New_collection">
            <div className="newnewCollect">
              <div className="hrNewCollect">
              </div>
            </div>
            <p className="price">$<span>44.99</span></p>
          </div>
          <div className="color_quantity">
            <div className="color">
              <p>color</p>
            <Radio.Group defaultValue="a">
              <Radio.Button className="color__item green" value="a"></Radio.Button>
              <Radio.Button className="color__item purple" value="b"></Radio.Button>
              <Radio.Button className="color__item yellow" value="c"></Radio.Button>
            </Radio.Group>
            </div>
            <div className="quantity">
              <button>-</button>
              <button></button>
              <button>+</button>
            </div>
            <div className="footerInfor">
              <div className="stock">
                <p>10 in stock</p>
                <div></div>
              </div>
              <div>
                <button>ADD TO CART</button>
                <button>BY NOW</button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
