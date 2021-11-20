import { Menu, Avatar, Dropdown } from "antd";
import { UserOutlined} from "@ant-design/icons";
import { useState } from "react";
import { onRemoveUser } from "redux/user";
import { useDispatch } from "react-redux";
import DrawerOrder from "components/Order/DrawerOrder";
export default function DropdownOverlay() {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={showDrawer}>
        <div>My order</div>
      </Menu.Item>
      <DrawerOrder onClose={onClose} visible={visible} />
      <Menu.Item key="2" onClick={() => dispatch(onRemoveUser())}>
        <div>Logout</div>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown
      overlay={menu}
      arrow="true"
      placement="bottomLeft"
    >
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
  );
}
