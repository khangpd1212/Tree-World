import {  Space, Table, Switch, } from "antd";
export default function OrderAdmin(){
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
            <Table dataSource={data}>
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="Address" dataIndex="address" key="address" />
                    <Column title="" dataIndex="description" key="description" />
                </Table>
    )
}
function onChange(checked) {
    console.log(`switch to ${checked}`);
}