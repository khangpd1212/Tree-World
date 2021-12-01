import { Select, Table, Tooltip } from "antd";
import useConvertISO from "hooks/useConvertISO";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getOrders, selectOrders, updateOrders } from "redux/order";
import TableDetail from "./TableDetail";

export default function TableOrder() {
  const { Option } = Select;
  const { orderList, loading } = useSelector(selectOrders);
  const [loaded, setLoaded] = useState(true);
  const [dataOrder, setDataOrder] = useState([]);
  const dispatch = useDispatch();
  const { convertISO } = useConvertISO();
  useEffect(() => {
    const orderMap = orderList.map((item) => {
      return {
        key: item._id,
        username: item.username,
        orderDate: convertISO(item.orderDate),
        address: item.address,
        phoneNumber: item.phoneNumber,
        toTal: item.toTal,
        status: item.status,
      };
    });
    setDataOrder(orderMap);
    loading === "loading" ? setLoaded(true) : setLoaded(false);
  }, [orderList]);
  console.log(dataOrder);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleStatusChange = (id, status) => {
    const dataStatus = { id: id, status: status };
    dispatch(updateOrders(dataStatus)).then((res) => {
      toast.success(`Status update success`, {
        position: "top-right",
        autoClose: 2000,
      });
    });
  };

  // const onChange = (pagination, filters, sorter, extra) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // }
  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.length - b.username.length,
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
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
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
      sorter: (a, b) => a.toTal - b.toTal,
      width: 80,
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Awaiting Payment", value: "Awaiting Payment" },
        { text: "Payment Success", value: "Payment Success" },
        { text: "Awaiting Shipment", value: "Awaiting Shipment" },
        { text: "Shipped", value: "Shipped" },
        { text: "Completed", value: "Completed" },
        { text: "Cancelled", value: "Cancelled" },
      ],
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
        // rowKey={(record) => record.login.uuid}
        expandable={{
          expandedRowRender: (record) => <TableDetail id={record.key} />,
        }}
        scroll={{ y: 800 }}
        dataSource={dataOrder}
        // onChange={handleTableChange}
      />
    </>
  );
}
