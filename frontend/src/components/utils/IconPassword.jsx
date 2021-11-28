import React from "react";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

export default function IconPassword(props) {
  return (
    <>
      {props.iconRender ? (
        <EyeFilled
          className="icon_pass"
          onClick={() => props.handleOnClick(props)}
        />
      ) : (
        <EyeInvisibleFilled
          className="icon_pass"
          onClick={() => props.handleOnClick(props)}
        />
      )}
    </>
  );
}
