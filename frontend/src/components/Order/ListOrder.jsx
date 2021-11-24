import { List, Collapse, Image } from "antd";
import { selectProducts } from "redux/product";
import { selectUsers } from "redux/user";
import { selectOrders } from "redux/order";
import { selectOrderDetails } from "redux/order_detail";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function ListOrder() {
  const { Panel } = Collapse;
  const [myOrder, setMyOrder] = useState([]);

  const { userItems } = useSelector(selectUsers);
  const { orderDetailList } = useSelector(selectOrderDetails);
  const { productList } = useSelector(selectProducts);
  const { orderList } = useSelector(selectOrders);
  useEffect(() => {

  const order_userID = orderList.filter((x) =>
    userItems._id.includes(x.idUser)
  );
    let order_orderDetailID = order_userID.map(
        (o1) => (
          orderDetailList.filter((o2) => o1._id == o2.id_order)
        )
      );
    setMyOrder(
      order_orderDetailID.map((o1) =>
        o1.map((o2) =>
          Object.assign(
            {},
            { quantity: o2.quantity },
            productList.filter((o3) => o2.id_product == o3._id)[0]
          )
        )
      )
    );
  }, [orderDetailList]);

  const description = (description, quantity) => (
    <>
      <span style={{ display: "block" }}>{description}</span>
      <span>{quantity}</span>
    </>
  );
  return (
    <Collapse defaultActiveKey={["0"]} expandIconPosition="right" ghost>
      {myOrder &&
        myOrder.map((itemOrder, keyOrder) => (
          <Panel header="dsada" key={keyOrder}>
            <List
              key={keyOrder}
              itemLayout="horizontal"
              dataSource={itemOrder}
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
