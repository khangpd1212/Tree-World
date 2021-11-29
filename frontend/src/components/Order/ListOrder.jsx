import { Collapse, Image, List, Skeleton, Divider, Tag } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectOrders } from "redux/order";
import { selectOrderDetails } from "redux/order_detail";
import { selectProducts } from "redux/product";
import { selectUsers } from "redux/user";
import TotalOrder from "./TotalOrder";
import PaginationComponent from "components/Product/PaginationComponent";
export default function ListOrder() {
  const { Panel } = Collapse;

  const { userItems } = useSelector(selectUsers);
  const { orderDetailList } = useSelector(selectOrderDetails);
  const { productList } = useSelector(selectProducts);
  const { orderList } = useSelector(selectOrders);
  const [orderUser, setOrderUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
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
          { pickColor: o2.color },
          { quantity: o2.quantity },
          productList.filter((o3) => o2.id_product == o3._id)[0]
        )
      ),
    }));

    setOrderUser(myOrder.reverse());
  }, [orderList, userItems]);
  // Lấy order mới nhất

  const description = (description, quantity, color) => (
    <>
      <span style={{ display: "block" }}>Description: {description}</span>
      <p>Quantity: {quantity}</p>
      {color === "#ffff" || color === "white" ? (
        <Tag style={{ color: "black" }} color={color}>
          {color}
        </Tag>
      ) : (
        <Tag color={color}>{color}</Tag>
      )}
    </>
  );

  return (
    <>
      <Collapse
        accordion
        defaultActiveKey={["0"]}
        expandIconPosition="right"
        ghost
      >
        {orderUser &&
          orderUser.map(
            (itemOrder, keyOrder) => (
              (
                <Panel header={itemOrder.orderDate} key={keyOrder}>
                  <List
                    key={keyOrder}
                    itemLayout="horizontal"
                    dataSource={itemOrder.product}
                    footer={
                      <TotalOrder
                        order={itemOrder.product}
                        // price={itemOrder.product}
                      />
                    }
                    renderItem={(itemChild) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Image width={80} src={itemChild.image[0]} />}
                          title={itemChild.product_name}
                          description={description(
                            itemChild.description,
                            itemChild.quantity,
                            itemChild.pickColor
                          )}
                        />
                        <div>${itemChild.price}</div>
                      </List.Item>
                    )}
                  />
                </Panel>
              )
            )
          )}
      </Collapse>
      {/* <PaginationComponent
        total={orderUser.length}
        currentPage={currentPage}
        pageSize={pageSize}
        paginate={paginate}
      /> */}
    </>
  );
}
