import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import "styles/btnAdd.scss"
export default function BtnAdd(props){
    const history = useHistory()
    const addClick=()=>{
        history.push(`/admin/${props.page}/add`)
    }
    return(
        <div className="btn__add">
        <Button type="button" onClick={addClick} icon={<PlusOutlined />}>ADD</Button>
        </div>
    )
}
