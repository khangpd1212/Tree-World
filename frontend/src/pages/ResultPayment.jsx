import { Result, Button } from "antd";
import { Link } from "react-router-dom";
export default function ResultPayment() {
  return (
    <div>
      <Result
        status="success"
        title="Order Successfully"
        subTitle="Order number: "
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
