import { Pagination } from "antd";
import React from "react";

function PaginationComponent({ currentPage, total, pageSize, paginate }) {
  return (
    <div className="product__section--pagination">
      <Pagination
        defaultCurrent={1}
        current={currentPage}
        total={total}
        defaultPageSize={pageSize}
        onChange={(e) => {
          paginate(e);
        }}
      />
    </div>
  );
}

export default PaginationComponent;
