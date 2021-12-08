import { UserOutlined, CaretDownFilled } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Menu } from "antd";
import LoginAdmin from "components/Admin/Login";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchLoginAdmin, onRemoveAdmin, selectUsers } from "redux/user";
import useAutoLogin from "hooks/useAutoLogin";
import { encoded } from "utils/encoded";
export default function Profile() {
  const dispatch = useDispatch();

  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const { autoLogin } = useAutoLogin();
  const { adminItems } = useSelector(selectUsers);

  const handleLogout = () => {
    dispatch(onRemoveAdmin());
    setIsOpenLogin(true);
  };

  const handleCreate = async (values) => {
    const response = await dispatch(fetchLoginAdmin(values));
    if (Object.values(response.payload).length !== 0) {
      setIsOpenLogin(false);
    } else {
      setIsOpenLogin(true);
    }
  };

  useEffect(() => {
    const tokenAdminLocal = localStorage.getItem("tokenAdmin");
    const tokenAdmin = tokenAdminLocal && encoded.encodedAdmin(tokenAdminLocal);

    if (tokenAdmin) {
      setIsOpenLogin(false);
      autoLogin(tokenAdmin.id, tokenAdmin.isAdmin);
    } else {
      setIsOpenLogin(true);
    }
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleLogout} style={{ padding: "8px 20px" }}>
        <div>Logout</div>
      </Menu.Item>
      <Menu.Item key="2" style={{ padding: "8px 20px" }}>
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
