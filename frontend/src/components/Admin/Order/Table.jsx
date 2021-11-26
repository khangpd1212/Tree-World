import { Button, message, Popconfirm, Space,Table } from "antd";
import TableDetail from "./TableDetail";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, selectOrders, deleteOrders } from "redux/order";

export default function TableOrder() {
  const { orderList } = useSelector(selectOrders);
  const [data, setData] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    setData(orderList.map((item) => {
      return {
        key: item._id,
        username: item.username,
        orderDate: item.orderDate,
        address: item.address,
        phoneNumber: item.phoneNumber,
        toTal: item.toTal,
        status: item.status
      }
    }))
  }, []);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch])
  function confirm(id) {
    dispatch(deleteOrders(id))
    message.success("Delete success");
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Total",
      dataIndex: "toTal",
      key: "toTal",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            placement="rightTop"
            title={"Do you want delete this ?"}
            onConfirm={() => confirm(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <TableDetail id={record.key} />,
        }}
        dataSource={data}
      />
    </>
  );
}
