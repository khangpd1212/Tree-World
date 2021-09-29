import { MenuOutlined } from "@ant-design/icons";
import { Layout, Anchor, Button, Drawer, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { Link as LinkRoute } from "react-router-dom";
import "styles/header.scss";
function BaseHeader() {
  const { Header } = Layout;
  const [visible, setVisible] = useState(false);
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
              <LinkRoute to={"/"}>About Us</LinkRoute>
              <LinkRoute to={"/product"}>Product</LinkRoute>
              <LinkRoute to={"/"}>Blog</LinkRoute>
              <LinkRoute to={"/"}>Contact Us</LinkRoute>
              <LinkRoute to={"/users"}>Login</LinkRoute>
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
                  <LinkRoute to={"/"}>Home</LinkRoute>
                  <LinkRoute to={"/"}>About Us</LinkRoute>
                  <LinkRoute to={"/"}>Product</LinkRoute>
                  <LinkRoute to={"/"}>Blog</LinkRoute>
                  <LinkRoute to={"/"}>Contact Us</LinkRoute>
                  <LinkRoute to={"/users"}>Login</LinkRoute>
                  <LinkRoute to={"/admin"}>Admin</LinkRoute>
                </div>
              </Anchor>
            </Drawer>
          </div>
        </Col>
      </Row>
    </Header>
  );
}

export default BaseHeader;
