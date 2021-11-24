import { Button, message, Popconfirm, Table, Space } from "antd";
import { selectProducts } from "redux/product";
import { selectOrders } from "redux/order";
import { selectOrderDetails } from "redux/order_detail";
import { useSelector } from "react-redux";
export default function TableDetail() {
    const { orderDetailList } = useSelector(selectOrderDetails);
    const { productList } = useSelector(selectProducts);
    const { orderList } = useSelector(selectOrders);
    let myOrder = [];

    // tìm kiếm danh sách order detail theo id order
    let order_orderDetailID = orderList.map((o1) => 
      orderDetailList.filter((o2) => o1._id == o2.id_order),
    );

    // tìm kiếm danh sách product theo id product trong order detail
    myOrder = order_orderDetailID.map((o1) =>
      o1.map((o2) =>
        Object.assign(
          {},
          { quantity: o2.quantity },
          productList.filter((o3) => o2.id_product == o3._id)[0]
        )
      )
    );
    console.log(myOrder);
  const columns = [
    { title: "Image", dataIndex: "image", key: "image" },
    { title: "ProductName", dataIndex: "product_name", key: "product_name" },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            placement="rightTop"
            title={"Do you want delete this ?"}
            // onConfirm={() => confirm(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
    // const orderDetail = myOrder.product;
    const data = myOrder.map((item) => {
      return {
        key: item._id,
        image: item.image,
        product_name: item.product_name,
      };
    });
    console.log(data);
  return <Table columns={columns} dataSource={data} pagination={false} />;
}
