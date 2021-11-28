import { List, Collapse, Image } from "antd";
import { selectProducts } from "redux/product";
import { selectUsers } from "redux/user";
import { selectOrders } from "redux/order";
import { selectOrderDetails } from "redux/order_detail";
import { useSelector } from "react-redux";
export default function ListOrder() {
  const { Panel } = Collapse;

  const { userItems } = useSelector(selectUsers);
  const { orderDetailList } = useSelector(selectOrderDetails);
  const { productList } = useSelector(selectProducts);
  const { orderList } = useSelector(selectOrders);
  let myOrder = [];
  // tìm kiếm danh sách order theo id user
  const order_userID = orderList.filter((x) =>
    userItems._id.includes(x.idUser)
  );
  // tìm kiếm danh sách order detail theo id order
  let order_orderDetailID = order_userID.map((o1) => ({
    orderDate: o1.orderDate,
    orderDetail: orderDetailList.filter((o2) => o1._id == o2.id_order),
  }));

  // tìm kiếm danh sách product theo id product trong order detail

  myOrder = order_orderDetailID.map((o1) => ({
    orderDate: o1.orderDate,
    product: o1.orderDetail.map((o2) =>
      Object.assign(
        {},
        { quantity: o2.quantity },
        productList.filter((o3) => o2.id_product == o3._id)[0]
      )
    ),
  }));
  // Lấy order mới nhất
  let reverseOrder = myOrder.reverse();
  
  const description = (description, quantity) => (
    <>
      <span style={{ display: "block" }}>{description}</span>
      <span>{quantity}</span>
    </>
  );
  return (
    <Collapse defaultActiveKey={["0"]} expandIconPosition="right" ghost>
      {reverseOrder &&
        reverseOrder.map((itemOrder, keyOrder) => (
          <Panel header={itemOrder.orderDate} key={keyOrder}>
            <List
              key={keyOrder}
              itemLayout="horizontal"
              dataSource={itemOrder.product}
              renderItem={(itemChild) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Image width={80} src={itemChild.image[0]} />}
                    title={itemChild.product_name}
                    description={description(
                      itemChild.description,
                      itemChild.quantity
                    )}
                  />
                  <div>${itemChild.price}</div>
                </List.Item>
              )}
            />
          </Panel>
        ))}
    </Collapse>
  );
}
