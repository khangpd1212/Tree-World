import { LoadingOutlined } from "@ant-design/icons";
import { Button, Result, Spin } from "antd";
import useAutoLogin from "hooks/useAutoLogin";
import useOrder from "hooks/useOrder";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { encoded } from "utils/encoded";

export default function ResultPayment() {
  const { handleOrder, resultCode } = useOrder();
  const { autoLogin } = useAutoLogin();

  const [orderId, setOrderId] = useState("");

  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

  useEffect(() => {
    let tokenUserLocal = localStorage.getItem("token");
    const token = tokenUserLocal && encoded.encodedUser(tokenUserLocal);

    // Đăng nhập lại để lấy thông tin user và order
    if (token) {
      autoLogin(token.id, token.isAdmin).then((res) => {
        const userItem = res.payload;
        handleOrder(userItem).then((res) => setOrderId(res));
      });
    }
  }, []);

  return (
    <div>
      {orderId ? (
        <Result
          status={resultCode == 0 || !resultCode ? "success" : "error"}
          title={
            resultCode == 0 || !resultCode
              ? "Order Successfully"
              : "Please buy again"
          }
          subTitle={orderId ? `Order number: ${orderId}` : null}
          extra={[
            <Link to="/product" key="1">
              <Button type="primary" key="buy">
                Buy Again
              </Button>
            </Link>,
          ]}
        />
      ) : (
        <div className="spinner--loading">
          <Spin indicator={antIcon} />
        </div>
      )}
    </div>
  );
}
