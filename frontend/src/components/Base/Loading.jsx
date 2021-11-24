import React from "react";
import "styles/loading.scss";
function Loading() {
  return (
    <div className="spin__loading">
      <div className="ant-spin ant-spin-spinning">
        <span className="anticon-spin">
          <img src="/icon.png" alt="spin loading" />
        </span>
      </div>
    </div>
  );
}

export default Loading;
