import {  Space, Table, Switch, } from "antd";
import BtnAdd from "components/BtnAdd";
export default function ProductAdmin(){
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
            <BtnAdd page='product' />
            <Table dataSource={data}>
                    <Column title="Image" dataIndex="image" key="image" />
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="Price" dataIndex="price" key="price" />
                    <Column title="Description" dataIndex="description" key="description" />
                    <Column title="Inventory" dataIndex="inventory" key="inventory" />
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