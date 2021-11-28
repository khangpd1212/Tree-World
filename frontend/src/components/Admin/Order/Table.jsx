import { Table, Switch } from "antd";
import TableDetail from "./TableDetail";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, selectOrders } from "redux/order";

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
  }, [orderList]);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch])
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
      title: "Order Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: 'Status',
      key: 'order_status',
      render: (text, record) => (
        <Switch defaultChecked={true} />
      )
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
