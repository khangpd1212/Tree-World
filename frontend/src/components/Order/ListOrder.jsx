import {
  Collapse,
  Form,
  Image,
  List,
  Tag,
  Pagination,
  Divider,
  Button,
  Input,
  Rate,
} from "antd";
import useConvertISO from "hooks/useConvertISO";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchGetComment } from "redux/comment";
import { getOrders, selectOrders, updateOrders } from "redux/order";
import { selectOrderDetails } from "redux/order_detail";
import { selectProducts } from "redux/product";
import { selectUsers } from "redux/user";
import { requests } from "utils/axios";
import StepOrder from "./StepOrder";
import TotalOrder from "./TotalOrder";
export default function ListOrder() {
  const { Panel } = Collapse;

  const { userItems } = useSelector(selectUsers);
  const { orderDetailList } = useSelector(selectOrderDetails);
  const { productList } = useSelector(selectProducts);
  const { orderList } = useSelector(selectOrders);
  const [orderUser, setOrderUser] = useState([]);

  const { convertISO } = useConvertISO();
  const numEachPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState({
    minValue: 0 * numEachPage,
    maxValue: 1 * numEachPage,
  });

  const dispatch = useDispatch();
  const [openModalReview, setOpenModalReview] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    let myOrder = [];

    // tìm kiếm danh sách order theo id user
    const order_userID = orderList.filter((x) =>
      userItems._id.includes(x.idUser)
    );
    // tìm kiếm danh sách order detail theo id order
    let order_orderDetailID = order_userID.map((o1) => ({
      orderDate: convertISO(o1.orderDate),
      id: o1._id,
      status: o1.status,
      orderDetail: orderDetailList.filter((o2) => o1._id == o2.id_order),
    }));

    // tìm kiếm danh sách product theo id product trong order detail
    myOrder = order_orderDetailID.map((o1) => ({
      orderDate: o1.orderDate,
      id: o1.id,
      status: o1.status,
      product: o1.orderDetail.map((o2) =>
        Object.assign(
          {},
          { pickColor: o2.color },
          { quantity: o2.quantity },
          productList.filter((o3) => o2.id_product == o3._id)[0]
        )
      ),
    }));

    setOrderUser(myOrder);
  }, [orderList, userItems]);
  console.log(orderUser);
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
  const handleChangePage = (value) => {
    setCurrentPage(value);
    setPage({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage,
    });
  };

  const handleReceived = (id) => {
    const data = { id: id, status: "Completed" };
    dispatch(updateOrders(data)).then((res) => {
      toast.success("Confirmed", {
        position: "bottom-left",
        autoClose: 2000,
      });
      setTimeout(() => {
        dispatch(getOrders());
      }, 2000);
    });
  };
  const reviewOpen = () => {
    setOpenModalReview(true);
  };
  const onFinish = (values) => {
    // console.log(values);
    let orderDetail = orderDetailList.filter(
      (o) => values.idOrder === o.id_order
    );
    let product = orderDetail.map((o2) =>
      Object.assign({}, { id: o2.id_product })
    );
    // console.log(product);
    product.forEach((item) => {
      let data = {
        idProduct: item.id,
        idUser: userItems._id,
        nameUser: userItems.username,
        star: values.star,
        content: values.content,
      };
      console.log(data);
      requests.addComment(userItems.accessToken, data).then((res) => {
        console.log(res);
      });
    });

    toast.success("Reviewed!!!", {
      autoClose: 2000,
    });
    dispatch(updateOrders({ id: values.idOrder, status: "Reviewed" }));
    form.resetFields();
    setOpenModalReview(false);
    dispatch(getOrders());
    dispatch(fetchGetComment());
  };

  return (
    <>
      <Collapse
        accordion
        defaultActiveKey={["0"]}
        expandIconPosition="right"
        ghost
      >
        {orderUser &&
          orderUser.length > 0 &&
          orderUser
            .slice(page.minValue, page.maxValue)
            .map((itemOrder, keyOrder) => (
              <Panel header={itemOrder.orderDate} key={keyOrder}>
                <StepOrder status={itemOrder.status} />
                <Divider />
                <List
                  key={keyOrder}
                  itemLayout="horizontal"
                  dataSource={itemOrder.product}
                  footer={<TotalOrder order={itemOrder.product} />}
                  renderItem={(itemChild) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Image
                            width={80}
                            src={itemChild.image && itemChild.image[0]}
                          />
                        }
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
                {itemOrder.status === "Shipped" ? (
                  <Button
                    onClick={() => {
                      handleReceived(itemOrder.id);
                    }}
                  >
                    Received
                  </Button>
                ) : itemOrder.status === "Completed" ? (
                  <Button type="primary" onClick={() => reviewOpen()}>
                    Review
                  </Button>
                ) : itemOrder.status === "Reviewed" ? (
                  <Button type="primary" style={{ color: "red" }} disabled>
                    Reviewed
                  </Button>
                ) : (
                  <></>
                )}

                {openModalReview ? (
                  <>
                    <Divider />
                    <Form
                      form={form}
                      onFinish={onFinish}
                      initialValues={{
                        idOrder: itemOrder.id,
                      }}
                    >
                      <Form.Item name="idOrder" hidden>
                        <Input
                          defaultValue={itemOrder.id}
                          value={itemOrder.id}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Star"
                        name="star"
                        rules={[
                          {
                            required: true,
                            message: "Please rate",
                          },
                        ]}
                      >
                        <Rate defaultValue={0}></Rate>
                      </Form.Item>
                      <Form.Item
                        label="Comment"
                        name="content"
                        rules={[
                          {
                            required: true,
                            message: "Please input your comment",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input.TextArea
                          rows={5}
                          style={{ resize: "none" }}
                        ></Input.TextArea>
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{
                          span: 12,
                          offset: 6,
                        }}
                      >
                        <Button type="primary" htmlType="submit">
                          Review
                        </Button>
                        <Button onClick={() => setOpenModalReview(false)}>
                          Cancel
                        </Button>
                      </Form.Item>
                    </Form>
                  </>
                ) : (
                  <></>
                )}
              </Panel>
            ))}
      </Collapse>
      <Divider />
      <Pagination
        style={{ textAlign: "right" }}
        current={currentPage}
        defaultPageSize={numEachPage}
        onChange={handleChangePage}
        total={orderUser.length}
        showTotal={(total) => `Total ${total} items`}
      />
    </>
  );
}
