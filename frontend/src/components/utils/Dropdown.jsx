import { UserOutlined, CaretDownFilled } from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import DrawerOrder from "components/Order/DrawerOrder";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { onRemoveUser } from "redux/user";
import { useHistory } from "react-router-dom";
export default function DropdownOverlay() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const handleLogout = () => {
    dispatch(onRemoveUser())
    localStorage.removeItem("address");
    history.push("/");
  }
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={showDrawer} style={{ padding: "8px 20px" }}>
        <div>My order</div>
      </Menu.Item>
      <DrawerOrder onClose={onClose} visible={visible} />
      <Menu.Item key="2" onClick={handleLogout} style={{ padding: "8px 20px" }}>
        <div>Logout</div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div style={{ position: "relative" }}>
      <Dropdown overlay={menu} arrow="true" placement="bottomLeft">
        <Avatar
          style={{
            backgroundColor: "#87d068",
            width: "40px",
            height: "40px",
            lineHeight: "40px",
            fontSize: "20px",
            margin: "0 18px",
            cursor: "pointer",
          }}
          icon={<UserOutlined />}
        ></Avatar>
      </Dropdown>
      <CaretDownFilled
        style={{
          position: "absolute",
          transform: "translateX(50%)",
          right: "50%",
          bottom: "-9px",
          color: "rgb(135, 208, 104)",
        }}
      />
    </div>
  );
}
