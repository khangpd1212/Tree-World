import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import "styles/btnAdd.scss"
export default function BtnAdd({ setOpen }) {

    return (
        <div className="btn__add">
            <Button type="button" onClick={() => setOpen(true)} icon={<PlusOutlined />}>ADD</Button>
        </div>
    )
}
