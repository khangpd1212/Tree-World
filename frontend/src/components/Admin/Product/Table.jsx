import { Button, Image, Space, Switch, Table, Tag, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchProducts, selectProducts } from "redux/product";
import { fetchCatalogs } from "redux/catalog";
import { requests } from "utils/axios";
import ModalEdit from "./ModalEdit";

export default function TableProducts() {
  const { Column } = Table;
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const [loaded, setLoaded] = useState(true);
  const [productData, setProductData] = useState([]);

  const dispatch = useDispatch();
  const { productList, loading } = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCatalogs());
  }, [dispatch]);

  useEffect(() => {
    const productMap = productList.map((item) => {
      return {
        key: item._id,
        _id: item._id,
        image: item.image,
        product_name: item.product_name,
        catalog_id: item.catalog_id,
        color: item.color,
        description: item.description,
        price: item.price,
        inventory: item.inventory,
        sold: item.sold,
        status: item.status,
      };
    });
    setProductData(productMap);
    !productData ? setLoaded(true) : setLoaded(false);
  }, [productList]);

  const handleChangeStatus = async (e, id) => {
    requests.editProduct({ status: e }, id).then((res) => {
      dispatch(fetchProducts());
      productData ? setLoaded(true) : setLoaded(false);
      toast.success(`Changed "${res.updatedProduct.product_name}" status`, {
        autoClose: 2000,
      });
    });
  };

  const onEdit = (data) => {
    setSelected(data);
    setVisible(true);
  };

  return (
    <>
      <Table dataSource={productData} loading={loaded}>
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
          width={100}
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
        <Column
          title="Description"
          dataIndex="description"
          key="description"
          ellipsis={{
            showTitle: false,
          }}
          render={(description) => (
            <Tooltip placement="topLeft" title={description}>
              {description}
            </Tooltip>
          )}
        />
        <Column
          title="Price ($)"
          dataIndex="price"
          key="price"
          width={100}
          sorter={(a, b) => a.price - b.price}
        />
        <Column
          title="Inventory"
          dataIndex="inventory"
          key="inventory"
          width={100}
          sorter={(a, b) => a.inventory - b.inventory}
        />
        <Column
          title="Sold"
          dataIndex="sold"
          key="sold"
          width={80}
          sorter={(a, b) => a.sold - b.sold}
        />
        <Column
          title="Status"
          key="id"
          width={100}
          render={(value, record) => (
            <Switch
              defaultChecked={record.status}
              onChange={(e) => {
                handleChangeStatus(e, record._id);
              }}
            />
          )}
        />
        <Column
          title="Action"
          key="action"
          width={100}
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
