import { useState } from "react";
import { Steps } from "antd";
export default function StepOrder() {
    const { Step } = Steps;
    const [current, setCurrent] = useState(0)
      const onChangeStep = (current) => {
        setCurrent(current);
      };
  return (
    <Steps
      current={current}
      progressDot onChange={onChangeStep
     }
    >
      <Step title="Finished" />
      <Step title="In Progress"  />
      <Step title="Waiting" />
    </Steps>
  );
}
