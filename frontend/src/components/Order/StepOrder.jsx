import { useState } from "react";
import { Steps } from "antd";
import { useEffect } from "react";
export default function StepOrder({ status }) {
  const { Step } = Steps;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (status === "Pending") {
      setCurrent(0);
    }
    if (status === "Awaiting Shipment") {
      setCurrent(1);
    }
    if (
      status === "Shipped" ||
      status === "Completed" ||
      status === "Reviewed"
    ) {
      setCurrent(2);
    }
  }, [status]);
  console.log(status);
  return (
    <Steps current={current} progressDot>
      <Step title="Pending" />
      <Step title="In Progress" />
      <Step title="Shipped" />
    </Steps>
  );
}
