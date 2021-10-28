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

              <button className="btn1">-</button>
              <h3 className="btn2">1</h3>
              <button className="btn3">+</button>
            </div>
          </div>
          <div className="stock">
            <p>10 in stock</p>
            <p>share now: </p>
          </div>
          <div className="footerInfor">
            <div>
              <button className="btnCart">ADD TO CART</button>
              <button className="btnBy">BY NOW</button>
            </div>
          </div>
        </Col>
        <Col className="textD" sx={24}>
          <div className="hrtext"></div>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ullam nesciunt architecto nostrum perspiciatis, voluptatum a delectus officia consectetur hic voluptatibus commodi cum esse et sed explicabo iusto corrupti fugiat odit aut, natus modi cupiditate omnis. Quibusdam commodi, similique corrupti deserunt consectetur totam praesentium! Vero, qui sint, eum quisquam hic quas provident ipsa repudiandae doloremque nam itaque nemo eos fugit dolorum ratione alias quod similique ducimus. Ad sint praesentium voluptates, qui necessitatibus iusto iure at ex provident harum velit animi?
          </span>
          <ul>
            <li>+ Dolor sit amet et dolore magna.</li>
            <li>+ Consectetur adipiscing elit, sed do eiusmod tempor.</li>
            <li>+ 1914 translation by H. Rackham.</li>
          </ul>
        </Col>
        <Col className="proCmt" xs={24}>
          <div className="hrCmt"></div>
        </Col>
      </Row>
    </div>
  );
}
