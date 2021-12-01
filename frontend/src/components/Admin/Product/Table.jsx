import { Button, Image, message, Popconfirm, Space, Switch, Table } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchProducts, selectProducts } from "redux/product";
import { requests } from "utils/axios";
import ModalAddProduct from "./ModalAddProduct";
import ModalEdit from "./ModalEdit";

export default function TableProducts() {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const userItem = JSON.parse(localStorage.getItem("userItems"));
  const token = userItem ? userItem.accessToken : null;
  const dispatch = useDispatch();
  const { productList } = useSelector(selectProducts);

  function confirm(id) {
    requests.deleteProduct(token, id).then((res) => {
      dispatch(fetchProducts());
      message.success("Delete success");
    });
  }
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
