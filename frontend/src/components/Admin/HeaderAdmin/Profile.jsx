import React, { useState, useEffect } from "react";
import { Avatar, Badge, Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { onRemoveUser, selectUsers } from "redux/user";
import { useDispatch, useSelector } from "react-redux";
import LoginAdmin from "components/Admin/Login";
import { fetchLogin } from "redux/user";

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
          <Dropdown overlay={menu} placement="bottomLeft">
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
            </Badge>
          </Dropdown>
        </span>
      </div>
    </>
  );
}
