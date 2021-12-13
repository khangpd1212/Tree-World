import { Select, Table, Tooltip } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectOrders, updateOrders } from "redux/order";
import TableDetail from "./TableDetail";

export default function TableOrder() {
  const dateFormat = "DD/MM/YYYY HH:mm:ss";
  const { Option } = Select;
  const { orderList, loading } = useSelector(selectOrders);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(true);
  const [dataOrder, setDataOrder] = useState([]);

  useEffect(() => {
    const orderMap = orderList.map((item) => {
      return {
        key: item._id,
        _id: item._id,
        username: item.username,
        orderDate: moment(item.orderDate).format(dateFormat),
        address: item.address,
        phoneNumber: item.phoneNumber,
        toTal: item.toTal,
        status: item.status,
      };
    });
    setDataOrder(orderMap);
    loading === "loading" ? setLoaded(true) : setLoaded(false);
  }, [orderList]);

  const handleStatusChange = async (id, status) => {
    const dataStatus = { id: id, status: status };
    await dispatch(updateOrders(dataStatus));
    toast.success(`Status update success`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Date",
      dataIndex: "orderDate",
      render: (orderDate) => <>{moment(orderDate).format(dateFormat)}</>,
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
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
        { text: "Payment Success", value: "Payment Success" },
        { text: "Awaiting Shipment", value: "Awaiting Shipment" },
        { text: "Shipped", value: "Shipped" },
        { text: "Completed", value: "Completed" },
        { text: "Reviewed", value: "Reviewed" },
        { text: "Cancelled", value: "Cancelled" },
      ],
      render: (status, record) => (
        <Select
          onChange={(status) => handleStatusChange(record._id, status)}
          style={{ width: "100%" }}
          defaultValue={status}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Payment Success">Payment Success</Option>
          <Option value="Awaiting Shipment">Awaiting Shipment</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Completed">Completed</Option>
          <Option value="Reviewed">Reviewed</Option>
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
          expandedRowRender: (record) => <TableDetail id={record._id} />,
        }}
        scroll={{ y: 800 }}
        dataSource={dataOrder}
      />
    </>
  );
}
