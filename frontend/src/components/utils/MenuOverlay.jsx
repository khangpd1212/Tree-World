import { Menu } from "antd";
import { onRemoveUser } from "redux/user";
import { useDispatch  } from "react-redux";
export default function MenuOverlay() { 
  const dispatch = useDispatch()
  return (
    <Menu>
      <Menu.Item key={1}>
        <div>My order</div>
      </Menu.Item>
      <Menu.Item key={2}>
        <div onClick={() => dispatch(onRemoveUser())}>Logout</div>
      </Menu.Item>
    </Menu>
  );
}
