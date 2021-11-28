import { Pagination } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectProducts } from "redux/product";

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
