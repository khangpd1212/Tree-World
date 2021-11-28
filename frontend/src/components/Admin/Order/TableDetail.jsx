import { Tag, Table, Space, Image } from "antd";
import { selectProducts } from "redux/product";
import { selectOrderDetails } from "redux/order_detail";
import { useSelector } from "react-redux";
export default function TableDetail(props) {

  const { orderDetailList } = useSelector(selectOrderDetails);
  const { productList } = useSelector(selectProducts);
  let myOrder = [];

  // tìm kiếm danh sách order detail theo id order
  let order_orderDetailID = orderDetailList.filter(
    (o1) => o1.id_order === props.id
  );
  // tìm kiếm danh sách product theo id product trong order detail
  myOrder = order_orderDetailID.map((o1) =>
    Object.assign(
      {},
      { idOrder: o1._id },
      { quantity: o1.quantity },
      { pickColor: o1.color},
      productList.filter((o2) => o1.id_product === o2._id)[0],
    ),
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (value) => (
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
      dataIndex: "pickColor",
      key: "pickColor",
      render: (record) => (
        console.log(record),
        record === "#ffff" || record === "white" ? (
          <Tag style={{ color: "black" }} color={{ record }}>
            {record}
          </Tag>
        ) : (
          <Tag color={record}>{record}</Tag>
        )
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Subtotal",
      dataIndex: "subTotal",
      key: "subTotal",
    },
  ];
  const data = myOrder.map((item) => {
    return {
      key: item.idOrder,
      image: item.image,
      product_name: item.product_name,
      pickColor: item.pickColor,
      price: item.price,
      quantity: item.quantity,
      subTotal: item.quantity + item.price,
    };
  });

  return <Table columns={columns} dataSource={data} pagination={false} />;
}
