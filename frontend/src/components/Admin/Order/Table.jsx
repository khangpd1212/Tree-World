import {
  Select, Table, Tooltip
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders, selectOrders, updateOrders
} from "redux/order";
import TableDetail from "./TableDetail";

export default function TableOrder() {
  const { Option } = Select;
  const { orderList, loading } = useSelector(selectOrders);
  const [loaded, setLoaded] = useState(true);
  const [dataOrder, setDataOrder] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const orderMap = orderList.map((item) => {
      return {
        key: item._id,
        username: item.username,
        orderDate: item.orderDate,
        address: item.address,
        phoneNumber: item.phoneNumber,
        toTal: item.toTal,
        status: item.status,
      };
    });
    setDataOrder(orderMap);
    loading === "loading" ? setLoaded(true) : setLoaded(false);
  }, [orderList]);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleStatusChange = (id, status) => {
    const dataStatus = { id: id, status: status };
    dispatch(updateOrders(dataStatus));
  };

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
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
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
      width: 80,
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          onChange={(status) => handleStatusChange(record.key, status)}
          style={{ width: "100%" }}
          defaultValue={status}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Awaiting Payment">Awaiting Payment</Option>
          <Option value="Awaiting Shipment">Awaiting Shipment</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Completed">Completed</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      ),
    },
  ];
  return (
    <>
      <Table
        loading={loaded}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <TableDetail id={record.key} />,
        }}
        scroll={{ y: 800 }}
        dataSource={dataOrder}
      />
    </>
  );
}
