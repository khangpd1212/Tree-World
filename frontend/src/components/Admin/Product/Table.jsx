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
      console.log(res);
      if (res.status) {
        dispatch(fetchProducts());
        toast.success(`Changed "${res.updatedProduct.product_name}" status`, {
          autoClose: 2000,
        });
      }
    });
  };

  const onEdit = (data) => {
    setSelected(data);
    setVisible(true);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "product_name",
      key: "product_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (value, record) => (
        <Space size="middle">
          <Image width={100} src={value} />
        </Space>
      ),
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
          <Popconfirm
            placement="rightTop"
            title={"Do you want delete this ?"}
            onConfirm={() => confirm(record._id)}
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
