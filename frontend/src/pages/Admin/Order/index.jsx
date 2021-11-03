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
                    <Column title="Name" dataIndex="name" key="name" />

                    <Column 
                    title="Status"
                    key="status"
                    render={(text, record)=>(
                        <Switch defaultChecked onChange={onChange} />
                    )}
                    />

                </Table>
    )
}
function onChange(checked) {
    console.log(`switch to ${checked}`);
}