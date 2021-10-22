import { Pagination } from "antd";
import React from "react";

function PaginationComponent() {
  return (
    <div className="product__section--pagination">
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
}

export default PaginationComponent;
