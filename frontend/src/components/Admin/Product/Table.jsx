import { Button, Image, Space, Switch, Table, Tag } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchProducts, selectProducts } from "redux/product";
import { requests } from "utils/axios";
import ModalEdit from "./ModalEdit";

export default function TableProducts() {
  const { Column } = Table;
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});

  const dispatch = useDispatch();
  const { productList } = useSelector(selectProducts);

  const handleChangeStatus = (e, id) => {
    requests.editProduct({ status: e }, id).then((res) => {
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

  return (
    <>
      <Table dataSource={productList}>
        <Column
          title="Image"
          dataIndex="image"
          key="image"
          render={(text, record) => <Image src={record.image} width="150px" />}
        />
        <Column
          title="Product Name"
          dataIndex="product_name"
          key="product_name"
          sorter={(a, b) => a.product_name.localeCompare(b.product_name)}
        />
        <Column
          title="Color"
          dataIndex="color"
          key="color"
          render={(record) =>
            record.map((item) =>
              item === "#ffff" || item === "white" ? (
                <Tag
                  style={{
                    marginTop: 10,
                    color: "black",
                    borderColor: "#00000014",
                  }}
                >
                  {item}
                </Tag>
              ) : (
                <div style={{ marginTop: 10 }}>
                  <Tag color={item}>{item}</Tag>
                </div>
              )
            )
          }
        />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Price ($)"
          dataIndex="price"
          key="price"
          sorter={(a, b) => a.price - b.price}
        />
        <Column
          title="Inventory"
          dataIndex="inventory"
          key="inventory"
          sorter={(a, b) => a.inventory - b.inventory}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(value, record) => (
            <Switch
              checked={record.status}
              onChange={(e) => {
                handleChangeStatus(e, record._id);
              }}
            />
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button type="primary" onClick={() => onEdit(record)}>
                Edit
              </Button>
            </Space>
          )}
        />
      </Table>
      <ModalEdit
        visible={visible}
        setVisible={setVisible}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}
