import {
  DollarOutlined,
  CreditCardOutlined,
  FieldTimeOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import ItemTagComp from "./ItemTagComp";
export default function TagComp() {
  const { orderList } = useSelector((state) => state.orderState);

  const shippedOrder =
    orderList && orderList.filter((item) => item.status === "Shipped");
  const cancelOrder =
    orderList && orderList.filter((item) => item.status === "Cancelled");
  const completeOrder =
    orderList &&
    orderList.filter(
      (item) => item.status === "Completed" || item.status === "Reviewed"
    );
  const total =
    completeOrder.length > 0
      ? completeOrder.length > 1
        ? completeOrder.reduce((prev, current) => prev.toTal + current.toTal)
        : completeOrder[0].toTal
      : 0;
  return (
    <div className="wrapper__tag">
      <ItemTagComp
        icon={<DollarOutlined />}
        bgColorTag="#368978ab"
        bgColorIcon="#368978"
        title="Tổng doanh thu"
        content={`${total} VNĐ`}
      />
      <ItemTagComp
        icon={<CreditCardOutlined />}
        bgColorTag={"#ff7875"}
        bgColorIcon={"#cf1322"}
        title="Đơn hàng bị hủy"
        content={cancelOrder && cancelOrder.length}
      />
      <ItemTagComp
        icon={<FieldTimeOutlined />}
        bgColorTag={"#ffd666"}
        bgColorIcon={"#d48806"}
        title="Đang giao"
        content={shippedOrder && shippedOrder.length}
      />
      <ItemTagComp
        icon={<ShoppingOutlined />}
        bgColorTag={"#69c0ff"}
        bgColorIcon={"#096dd9"}
        title="Giao thành công"
        content={completeOrder && completeOrder.length}
      />
    </div>
  );
}
