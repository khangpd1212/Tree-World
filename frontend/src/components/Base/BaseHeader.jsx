import { MenuOutlined } from "@ant-design/icons";
import { Layout, Anchor, Button, Drawer, Row, Col, Modal, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link as LinkRoute } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCatalogs } from "redux/catalog";
import "styles/header.scss";
import "styles/login.scss";

function BaseHeader() {
  const { Header } = Layout;
  const { SubMenu } = Menu;
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [show, handleShow] = useState(false);
  const { catalogList } = useSelector(selectCatalogs);
  const transitionNavBar = () => {
    if (window.scrollY > 10) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  // modal login
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  });

  return (
    <Header
      className={show ? "bg__change" : ""}
      style={{ position: "fixed", zIndex: 999, width: "100%" }}
    >
      <Row justify="space-between" align="middle">
        <Col className="gutter-row" xs={16} sm={7} md={6} xl={6}>
          <div className="logo">
            <img src="/logo.png" alt="tree-world-logo" />
          </div>
        </Col>
        <Col className="gutter-row" xs={8} sm={17} md={18} xl={18}>
          <div className="mobileHidden">
            <Anchor affix={false}>
              <div>
                <LinkRoute to={"/"}>Home</LinkRoute>
              </div>
              <div>
                <LinkRoute to={"/"}>About</LinkRoute>
              </div>
              <div className="dropdown__menu">
                <LinkRoute to={"/product"}>Product</LinkRoute>
                <div
                  className={
                    show
                      ? "dropdown__menu--list bg__change"
                      : "dropdown__menu--list"
                  }
                >
                  <Row>
                    {catalogList &&
                      catalogList.map((item, index) => (
                        <Col span={12} key={index}>
                          <li>
                            <LinkRoute to={`/product/${item.catalog_name}`}>
                              {item.catalog_name}
                            </LinkRoute>
                          </li>
                        </Col>
                      ))}
                  </Row>
                </div>
              </div>
              <div>
                <LinkRoute to={"/"}>Blog</LinkRoute>
              </div>
              <div>
                <LinkRoute to={"/contact"}>Contact</LinkRoute>
              </div>
              <div>
                <LinkRoute to={"/cart"}>Cart</LinkRoute>
              </div>
              <div className="div__login" onClick={showModal}>
                Login
              </div>
              <div>
                <LinkRoute to={"/admin"}>Admin</LinkRoute>
              </div>
            </Anchor>
          </div>
          <div className="mobileVisible">
            <Button onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <Drawer
              placement="right"
              closable={false}
              onClose={onClose}
              visible={visible}
            >
              <Anchor>
                <div className="navbar__link">
                  <div className="navbar__menu">
                    <LinkRoute to={"/"} onClick={onClose}>
                      Home
                    </LinkRoute>
                  </div>
                  <div className="navbar__menu">
                    <LinkRoute to={"/"} onClick={onClose}>
                      About Us
                    </LinkRoute>
                  </div>
                  <div className="navbar__menu dropdown__menu">
                    <LinkRoute to={"/product"} onClick={onClose}>
                      Product
                    </LinkRoute>
                    <Menu mode="inline">
                      <SubMenu>
                        <Menu.Item>Cactus</Menu.Item>
                      </SubMenu>
                    </Menu>
                  </div>
                  <div className="navbar__menu">
                    <LinkRoute to={"/"} onClick={onClose}>
                      Blog
                    </LinkRoute>
                  </div>
                  <div className="navbar__menu">
                    <LinkRoute to={"/contact"} onClick={onClose}>
                      Contact Us
                    </LinkRoute>
                  </div>
                  <div className="navbar__menu">
                    {" "}
                    <LinkRoute to={"/cart"} onClick={onClose}>
                      Cart
                    </LinkRoute>
                  </div>
                  <div className="navbar__menu">
                    <LinkRoute to={"/login"} onClick={onClose}>
                      Login
                    </LinkRoute>
                  </div>
                  <div className="navbar__menu">
                    <LinkRoute to={"/admin"}>Admin</LinkRoute>
                  </div>
                </div>
              </Anchor>
            </Drawer>
          </div>
        </Col>
      </Row>

      {/* login */}
      <Modal
        width={"38vw"}
        bodyStyle={{ padding: 0 }}
        closable={false}
        wrapClassName="modal"
        footer={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="img-login">
          <img src="/logo.png" alt="tree-world-logo" className="logo-login" />
          <img src="images/bg_login.png" alt="bg-login" className="bg-login" />
        </div>
        <h1 className="title-login">Welcome!</h1>
        <form className="content-login">
          <input
            className="content-login_input"
            type="text"
            placeholder="Username*"
          />
          <input
            className="content-login_input"
            type="password"
            placeholder="Password*"
          />
          <div className="wrapper-remember_forgot">
            <div className="wrapper-checkbox">
              <input type="checkbox" id="login_checkbox" />
              <label htmlFor="login_checkbox" className="label-checkbox">
                Remember
              </label>
            </div>
            <a href="#" className="login-forget">
              Forget Password?
            </a>
          </div>
          <button type="submit" className="login-btn_submit">
            login
          </button>
        </form>
        <div className="footer-login">
          <div className="icon-login">
            <a href="#">
              <img src="images/icon-fb_login.png" alt="icon-fb_login" />
            </a>
            <a href="#">
              <img
                src="images/icon-twitter_login.png"
                alt="icon-twitter_login"
              />
            </a>
            <a href="#">
              <img src="images/icon-gg_login.png" alt="icon-gg_login" />
            </a>
          </div>
          <div className="add-account">
            <a href="#">Create account</a>
          </div>
        </div>
      </Modal>
    </Header>
  );
}

export default BaseHeader;
