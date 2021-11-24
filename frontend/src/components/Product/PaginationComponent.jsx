import { Pagination } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setPage } from "redux/filter";
import { selectProducts } from "redux/product";

function PaginationComponent({ products }) {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.filterState);
  // const { filterProduct } = useSelector(selectProducts);
  return (
    <div className="product__section--pagination">
      <Pagination
        defaultCurrent={1}
        current={page + 1}
        total={10}
        defaultPageSize={2}
        onChange={(e) => {
          console.log(e);
          dispatch(setPage(e - 1));
        }}
      />
    </div>
  );
}

export default PaginationComponent;
