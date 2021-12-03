import { Button, Image, Space, Switch, Table, Tag } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectProducts } from "redux/product";
import { requests } from "utils/axios";
import ModalEdit from "./ModalEdit";

export default function TableProducts() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const token = JSON.parse(localStorage.getItem("tokenAdmin"));
  
  const { productList } = useSelector(selectProducts);

  const handleChangeStatus = (e, id) => {
    requests.editProduct(token, { status: e }, id).then((res) => {
      toast.success(`Status update success`, {
        autoClose: 2000,
      });
    });
  };

  const onEdit = (data) => {
    setSelected(data);
    setVisible(true);
  };
  const columns = [
    {
      title: "Image URL",
      dataIndex: "image",
      key: "image",
      render: (value, record) => (
        <Space size="middle">
          <Image width={100} src={value} />
        </Space>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (record) =>
        record.map((item) =>
          item === "#ffff" || item === "white" ? (
            <Tag
              style={{ color: "black", borderColor: "#00000014" }}
              color={{ item }}
            >
              {item}
            </Tag>
          ) : (
            <Tag color={item}>{item}</Tag>
          )
        ),
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Inventory",
      dataIndex: "inventory",
      key: "inventory",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value, record) => (
        <Switch
          defaultChecked={record.status}
          onChange={(e) => {
            handleChangeStatus(e, record._id);
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onEdit(record)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={productList} />
      <ModalEdit
        visible={visible}
        setVisible={setVisible}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}
