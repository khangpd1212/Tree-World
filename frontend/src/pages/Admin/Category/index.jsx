import {  Space, Table, Switch, } from "antd";
import BtnAdd from "components/BtnAdd";
export default function CategoryAdmin(){
    const { Column,  } = Table;
    const data = [
        {
          key: "1",
          name: "John",
          Price: 32,
          address: "New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
      ];
    return(
          <>
            <BtnAdd page='category' />
            <Table dataSource={data}>
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column 
                    title="Status"
                    key="status"
                    render={(text, record)=>(
                        <Switch defaultChecked onChange={onChange} />
                    )}
                    />

            </Table>
            </>
    )
}
function onChange(checked) {
    console.log(`switch to ${checked}`);
}