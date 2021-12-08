import { MenuOutlined } from "@ant-design/icons";
import { Anchor, Button, Col, Drawer, Layout, Menu, Row } from "antd";
import DropdownOverlay from "components/utils/Dropdown";
import LoginDesktop from "pages/Login/LoginDesktop";
import SignUpDesktop from "pages/SignUp/SignUpDesktop";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as LinkRoute } from "react-router-dom";
import { selectCatalogs } from "redux/catalog";
import { setCatalog, setDefault } from "redux/filter";
import { setDefaultStatus, setFilterStatus } from "redux/layout";
import { ShowModalLogin } from "redux/modal";
import { selectUsers } from "redux/user";
import "styles/header.scss";

function BaseHeader() {
  const { Header } = Layout;
  const { SubMenu } = Menu;
  const [visible, setVisible] = useState(false);
  const [show, handleShow] = useState(false);
  const dispatch = useDispatch();

  const { userItems } = useSelector(selectUsers);
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

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  });
  return (
    <Header
      className={show ? "bg__change" : ""}
      style={
        show
          ? { position: "fixed", zIndex: 999, width: "100%" }
          : { width: "100%" }
      }
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
                <LinkRoute
                  to={"/"}
                  onClick={() => {
                    dispatch(setDefault());
                    dispatch(setDefaultStatus());
                  }}
                >
                  Home
                </LinkRoute>
              </div>
              <div>
                <LinkRoute to={"/about"}>About</LinkRoute>
              </div>
              <div className="dropdown__menu">
                <LinkRoute
                  to={"/product"}
                  onClick={() => {
                    dispatch(setDefault());
                    dispatch(setDefaultStatus());
                  }}
                >
                  Product
                </LinkRoute>
                <div
                  className={
                    show
                      ? "dropdown__menu--list bg__change"
                      : "dropdown__menu--list"
                  }
                >
                  <Row>
                    {catalogList &&
                      catalogList.map((item, index) => {
                        if (item.status) {
                          return (
                            <Col span={12} key={index}>
                              <li>
                                <LinkRoute
                                  to={`/product/${item.catalog_name}-cat.${item._id}`}
                                  onClick={() => {
                                    dispatch(setCatalog(item._id));
                                    dispatch(setFilterStatus());
                                  }}
                                >
                                  {item.catalog_name}
                                </LinkRoute>
                              </li>
                            </Col>
                          );
                        }
                      })}
                  </Row>
                </div>
              </div>
              <div>
                <LinkRoute to={"/blog"}>Blog</LinkRoute>
              </div>
              <div>
                <LinkRoute to={"/contact"}>Contact</LinkRoute>
              </div>
              <div>
                <LinkRoute to={"/cart"}>Cart</LinkRoute>
              </div>
              <div>
                <LinkRoute to={"/payment"}>
                  Payment
                </LinkRoute>
              </div>
              <div>
                <LinkRoute to={"/admin"}>Admin</LinkRoute>
              </div>
              {Object.values(userItems).length === 0 ? (
                <div
                  className="div__login"
                  onClick={() => dispatch(ShowModalLogin(true))}
                >
                  Login
                </div>
              ) : (
                <DropdownOverlay />
              )}
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
                    <LinkRoute
                      to={"/"}
                      onClick={() => {
                        dispatch(setDefault());
                        dispatch(setDefaultStatus());
                        onClose();
                      }}
                    >
                      Home
                    </LinkRoute>
                  </div>
                  <div className="navbar__menu">
                    <LinkRoute to={"/about"} onClick={onClose}>
                      About Us
                    </LinkRoute>
                  </div>
                  <div className="navbar__menu dropdown__menu">
                    <LinkRoute
                      to={"/product"}
                      onClick={() => {
                        dispatch(setDefault());
                        dispatch(setDefaultStatus());
                        onClose();
                      }}
                    >
                      Product
                    </LinkRoute>
                    <Menu mode="inline">
                      <SubMenu>
                        {catalogList &&
                          catalogList.map((item, index) => {
                            if (item.status) {
                              return (
                                <Menu.Item
                                  key={index}
                                  onClick={() => {
                                    dispatch(setCatalog(item._id));
                                    dispatch(setFilterStatus());
                                    onClose();
                                  }}
                                >
                                  {item.catalog_name}
                                </Menu.Item>
                              );
                            }
                          })}
                      </SubMenu>
                    </Menu>
                  </div>
                  <div className="navbar__menu">
                    <LinkRoute to={"/blog"} onClick={onClose}>
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
      <LoginDesktop />
      <SignUpDesktop />
    </Header>
  );
}

export default BaseHeader;
