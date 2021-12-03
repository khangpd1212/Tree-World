import { UserOutlined, CaretDownFilled } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Menu } from "antd";
import LoginAdmin from "components/Admin/Login";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLoginAdmin, onRemoveAdmin, selectUsers } from "redux/user";
import { toast } from "react-toastify";
import useAutoLogin from "hooks/useAutoLogin";
import useAuth from "hooks/useAuth";
export default function Profile() {
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const { adminItems } = useSelector(selectUsers);
  const { autoLogin } = useAutoLogin();
  const { isAdmin, id } = useAuth();
  console.log(adminItems);
  const handleLogout = () => {
    dispatch(onRemoveAdmin());
    setState(true);
  };
  const handleShowLogin = () => {
    setIsOpenLogin(true);
  };

  const handleCreate = (values) => {
    dispatch(fetchLoginAdmin(values));
    if (Object.values(adminItems).length !== 0) {
      setIsOpenLogin(false);
    } else {
      setIsOpenLogin(true);
      toast.error(`Login is error`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    }
  };
  const handleCancel = () => {
    if (Object.values(adminItems).length !== 0) {
      setIsOpenLogin(false);
    } else {
      setIsOpenLogin(true);
    }
  };

  useEffect(() => {
    if (Object.values(adminItems).length !== 0) {
      autoLogin(id, isAdmin);
      setIsOpenLogin(false);
    } else {
      setIsOpenLogin(true);
    }
  }, []);

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
      {/* login */}
      <LoginAdmin
        visible={isOpenLogin}
        onCreate={handleCreate}
        onCancel={handleCancel}
      />

      {/* profile */}
      <div className="profile">
        <span className="avatar-item">
          <div className="avatar-item__text">
            <p>{adminItems ? adminItems.username : null}</p>
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
