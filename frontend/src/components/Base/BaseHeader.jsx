import {MenuOutlined} from "@ant-design/icons";
import {Anchor, Button, Checkbox, Col, Drawer, Layout, Modal, Row,} from "antd";
import React, {useEffect, useState} from "react";
import {Link as LinkRoute} from "react-router-dom";
import "styles/header.scss";
import "styles/login.scss";

function BaseHeader() {
  const { Header } = Layout;
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [show, handleShow] = useState(false);
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
              <LinkRoute to={"/"}>Home</LinkRoute>
              <LinkRoute to={"/"}>About</LinkRoute>
              <LinkRoute to={"/product"}>Product</LinkRoute>
              <LinkRoute to={"/"}>Blog</LinkRoute>
              <LinkRoute to={"/contact"}>Contact</LinkRoute>
              <LinkRoute to={"/cart"}>Cart</LinkRoute>
              <div onClick={showModal}>Login</div>
              <LinkRoute to={"/admin"}>Admin</LinkRoute>
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
                  <LinkRoute to={"/"} onClick={onClose}>
                    Home
                  </LinkRoute>
                  <LinkRoute to={"/"} onClick={onClose}>
                    About Us
                  </LinkRoute>
                  <LinkRoute to={"/product"} onClick={onClose}>
                    Product
                  </LinkRoute>
                  <LinkRoute to={"/"} onClick={onClose}>
                    Blog
                  </LinkRoute>
                  <LinkRoute to={"/contact"} onClick={onClose}>
                    Contact Us
                  </LinkRoute>
                  <LinkRoute to={"/cart"} onClick={onClose}>
                    Cart
                  </LinkRoute>
                  <LinkRoute to={"/login"} onClick={onClose}>
                    Login
                  </LinkRoute>
                  <LinkRoute to={"/admin"}>Admin</LinkRoute>
                </div>
              </Anchor>
            </Drawer>
          </div>
        </Col>
      </Row>

      {/* login */}
      <Modal
        width={"40vw"}
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
          <input type="text" placeholder="Username*" />
          <input type="password" placeholder="Password*" />
          <div className="wrapper-remember_forgot">
            <Checkbox>Remember</Checkbox>
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
