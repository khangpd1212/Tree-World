import { MenuOutlined } from "@ant-design/icons";
import LoginDesktop from "../../pages/Login/LoginDesktop";
import { Layout, Anchor, Button, Drawer, Row, Col, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link as LinkRoute } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCatalogs } from "redux/catalog";
import "styles/header.scss";

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
                <LinkRoute to={"/about"}>About</LinkRoute>
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
                            <LinkRoute
                              to={`/product/${item.catalog_name}-cat.${item._id}`}
                            >
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
              <div>
                <LinkRoute to={"/payment"}>Payment</LinkRoute>
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
                    <LinkRoute to={"/about"} onClick={onClose}>
                      About Us
                    </LinkRoute>
                  </div>
                  <div className="navbar__menu dropdown__menu">
                    <LinkRoute to={"/product"} onClick={onClose}>
                      Product
                    </LinkRoute>
                    <Menu mode="inline">
                      <SubMenu>
                        {catalogList &&
                          catalogList.map((item, index) => (
                            <Menu.Item key={index}>
                              {item.catalog_name}
                            </Menu.Item>
                          ))}
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
                    <LinkRoute to={"/payment"} onClick={onClose}>
                      Payment
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
      <LoginDesktop
        showModal={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </Header>
  );
}

export default BaseHeader;
