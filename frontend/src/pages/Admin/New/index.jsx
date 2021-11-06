import {  Space, Table, Switch, } from "antd";
import BtnAdd from "components/BtnAdd";
export default function News(){
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
            <BtnAdd page='new' />
            <Table dataSource={data}>
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Date" dataIndex="date" key="date" />
                <Column title="Conten" dataIndex="Conten" key="Conten" />
                <Column 
                title="Status"
                key="status"
                render={(text, record)=>(
                    <Switch defaultChecked onChange={onChange} />
                )}
                />
                <Column
                title="Action"
                key="action"
                render={(text, record) => (
                    <Space size="middle">
                    <a>edit {record.lastName}</a>
                    <a>Delete</a>
                    </Space>
                )}
                />
            </Table>
        </>
    )
}
function onChange(checked) {
    console.log(`switch to ${checked}`);
}