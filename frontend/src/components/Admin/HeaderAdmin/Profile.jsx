import { UserOutlined, CaretDownFilled } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Menu } from "antd";
import LoginAdmin from "components/Admin/Login";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLogin, onRemoveUser, selectUsers } from "redux/user";

export default function Profile() {
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const { userItems } = useSelector(selectUsers);

  const userItem = JSON.parse(localStorage.getItem("userItems"));
  const token = userItem ? userItem.accessToken : null;

  const handleLogout = () => {
    dispatch(onRemoveUser());
    setState(true);
  };
  const handleShowLogin = () => {
     setIsOpenLogin(true);
  }
  const handleCreate = (values) => {
    dispatch(fetchLogin(values));
    setIsOpenLogin(false);
  };

  const handleCancel = () => {
    !token ? setIsOpenLogin(true) : setIsOpenLogin(false);
  };

  useEffect(() => {
    if (!token) {
      setIsOpenLogin(true);
    }
  }, [token]);

  const menu = (
    <Menu>
      {state ? (
        <Menu.Item key="1" onClick={handleShowLogin}>
          <div>Login</div>
        </Menu.Item>
      ) : (
        <Menu.Item key="2" onClick={handleLogout}>
          <div>Logout</div>
        </Menu.Item>
      )}
      <Menu.Item key="3">
        <Link to="../">Client</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <LoginAdmin
        visible={isOpenLogin}
        onCreate={handleCreate}
        onCancel={handleCancel}
      />
      <div className="profile">
        <span className="avatar-item">
          <div className="avatar-item__text">
            <p>{userItems ? userItems.username : null}</p>
            <span>Admin Profile</span>
          </div>
          <Dropdown overlay={menu} placement="bottomLeft" arrow="true">
            <Badge count={1}>
              <Avatar
                style={{
                  backgroundColor: "#87d068",
                  width: "40px",
                  height: "40px",
                  lineHeight: "40px",
                }}
                icon={<UserOutlined style={{ fontSize: "20px" }} />}
              />
              <CaretDownFilled
                style={{
                  position: "absolute",
                  transform: "translateX(50%)",
                  right: "50%",
                  bottom: "-9px",
                  color: "#87d068",
                }}
              />
            </Badge>
          </Dropdown>
        </span>
      </div>
    </>
  );
}
