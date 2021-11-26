import { Button, message, Popconfirm, Table, Space, Image } from "antd";
import { selectProducts } from "redux/product";
import { selectOrders } from "redux/order";
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
      { quantity: o1.quantity },
      productList.filter((o2) => o1.id_product == o2._id)[0]
    )
  );
  const columns = [
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
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
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
      key: item._id,
      image: item.image,
      product_name: item.product_name,
      price: item.price,
      quantity: item.quantity,
      subTotal: item.quantity + item.price
    };
  });
  return <Table columns={columns} dataSource={data} pagination={false} />;
}
