import { Avatar, Badge, Drawer } from "antd";
import { useSelector } from "react-redux";
import { selectUsers } from "redux/user";
import ListOrder from "./ListOrder";

export default function DrawerOrder(props) {
  const { userItems } = useSelector(selectUsers);
  const title = (
    <div
      className="avatar-item"
      style={{ display: "flex", alignItems: "center", gap: 14 }}
    >
      <Badge count={1}>
        <Avatar
          size="large"
          src="https://joeschmoe.io/api/v1/random"
          style={{
            backgroundColor: "#87d068",
            width: "40px",
            height: "40px",
            lineHeight: "40px",
          }}
        />
      </Badge>
      <div className="avatar-item__text" style={{ fontSize: 14 }}>
        <span>{userItems.username}</span>
      </div>
    </div>
  );
  return (
    <Drawer
      title={title}
      placement="right"
      onClose={props.onClose}
      visible={props.visible}
      width="500px"
      headerStyle={{ padding: 20 }}
      drawerStyle={{ backgroundColor: "white" }}
    >
      <ListOrder />
    </Drawer>
  );
}
