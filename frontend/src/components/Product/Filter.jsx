import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Radio, Row, Select } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { setUrlStatus } from "redux/layout";
const { Option } = Select;
function Filter() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const changePrice = (value) => {
    console.log(location);
    // dispatch(
    //   setUrlStatus({
    //     pathname: `${location.pathname}?order=${value}&price=true`,
    //     search: `?order=${value}&price=true`,
    //   })
    // );
    history.push({
      pathname: location.pathname,
      search: `?order=${value}&price=true`,
    });
  };
  const changeSort = (value) => {
    console.log(value);
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
            onChange={changeSort}
          >
            <Radio.Button value="default">Default Sorting</Radio.Button>
            <Radio.Button value="hot">Hot New</Radio.Button>
            <Radio.Button value="best">Best Seller</Radio.Button>

            <Select placeholder="PRICE" onChange={changePrice}>
              <Option value="asc">Low to High</Option>
              <Option value="desc">High to Low</Option>
            </Select>
          </Radio.Group>
        </div>
        <div className="pagination__btn">
          <span className="pagination__btn--show">1/100</span>
          <div className="pagination__btn--group">
            <Button disabled>
              <LeftOutlined />
            </Button>
            <Button>
              <RightOutlined />
            </Button>
          </div>
        </div>
      </Row>
    </div>
  );
}

export default Filter;
