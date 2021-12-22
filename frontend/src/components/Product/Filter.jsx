import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Radio, Row, Select } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setBestSeller, setHot, sortDefault, sortPrice } from "redux/filter";
import { setFilterStatus } from "redux/layout";

const { Option } = Select;
function Filter({ currentPage, total, pageSize, paginate }) {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("default");

  const changePrice = (value) => {
    console.log(value);
    setSort(value);
    dispatch(setFilterStatus());
    dispatch(sortPrice(value));
  };
  const changeSort = (e) => {
    console.log(e.target.value);
    setSort(e.target.value);
    dispatch(setFilterStatus());

    if (e.target.value === "hot") {
      dispatch(setHot());
    } else if (e.target.value === "sales") {
      dispatch(setBestSeller());
    } else {
      dispatch(sortDefault());
    }
  };

  return (
    <div className="product__section--filter">
      <Row justify="space-between" align="middle">
        <div className="tabletVisible">
          <Select placeholder="SEARCH FILTER">
            <Option value="search">Search Filter</Option>
          </Select>
        </div>
        <div>
          <Radio.Group
            defaultValue="default"
            buttonStyle="solid"
            value={sort}
            onChange={changeSort}
          >
            <Radio.Button value="default">Default Sorting</Radio.Button>
            <Radio.Button value="hot">Hot</Radio.Button>
            <Radio.Button value="sales">Best Seller</Radio.Button>

            <Select placeholder="PRICE" onChange={changePrice}>
              <Option value="asc">Low to High</Option>
              <Option value="desc">High to Low</Option>
            </Select>
          </Radio.Group>
        </div>
        <div className="pagination__btn">
          <span className="pagination__btn--show">
            {currentPage}/{Math.ceil(total / pageSize)}
          </span>
          <div className="pagination__btn--group">
            {currentPage > 1 ? (
              <Button onClick={() => paginate(currentPage - 1)}>
                <LeftOutlined />
              </Button>
            ) : (
              <Button disabled>
                <LeftOutlined />
              </Button>
            )}

            {currentPage < Math.ceil(total / pageSize) ? (
              <Button onClick={() => paginate(currentPage + 1)}>
                <RightOutlined />
              </Button>
            ) : (
              <Button disabled>
                <RightOutlined />
              </Button>
            )}
          </div>
        </div>
      </Row>
    </div>
  );
}

export default Filter;
