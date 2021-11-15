import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Radio, Row, Select } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBestSeller,
  setHot,
  setPage,
  sortDefault,
  sortPrice,
} from "redux/filter";
import { setFilterStatus } from "redux/layout";

const { Option } = Select;
function Filter() {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("default");
  const [qty, setQty] = useState(1);
  const { page } = useSelector((state) => state.filterState);

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
  const increaseQty = () => {
    setQty(qty + 1);
    dispatch(setPage(qty));
    dispatch(setFilterStatus());
  };
  const descreaseQty = () => {
    setQty(qty - 1);
    dispatch(setPage(qty - 2));
    dispatch(setFilterStatus());
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
          <span className="pagination__btn--show">{page + 1}/100</span>
          <div className="pagination__btn--group">
            {page + 1 === 1 ? (
              <Button disabled>
                <LeftOutlined />
              </Button>
            ) : (
              <Button onClick={descreaseQty}>
                <LeftOutlined />
              </Button>
            )}

            <Button onClick={increaseQty}>
              <RightOutlined />
            </Button>
          </div>
        </div>
      </Row>
    </div>
  );
}

export default Filter;
