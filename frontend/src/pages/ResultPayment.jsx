import { Button, Result } from "antd";
import useOrder from "hooks/useOrder";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ResultPayment() {
  const { handleOrder, resultCode } = useOrder();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    handleOrder().then((res) => setOrderId(res));
  }, []);
  console.log(resultCode);
  return (
    <div>
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
    </div>
  );
}
