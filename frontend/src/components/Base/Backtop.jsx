import React from "react";
import { BackTop } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
function Backtop() {
  const style = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: "50%",
    backgroundColor: "#1d483f",
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  };
  return (
    <BackTop>
      <div style={style}>
        <VerticalAlignTopOutlined />
      </div>
    </BackTop>
  );
}

export default Backtop;
