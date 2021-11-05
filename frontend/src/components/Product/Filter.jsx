import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Radio, Row, Select } from "antd";
import React from "react";
const { Option } = Select;
function Filter() {
  return (
    <div className="product__section--filter">
      <Row justify="space-between" align="middle">
        <div className="tabletVisible">
          <Select defaultValue="search">
            <Option value="search">Search Filter</Option>
          </Select>
        </div>
        <div>
          <Radio.Group defaultValue="default" buttonStyle="solid">
            <Radio.Button value="default">Default Sorting</Radio.Button>
            <Radio.Button value="hot">Hot New</Radio.Button>
            <Radio.Button value="best">Best Seller</Radio.Button>
          </Radio.Group>
          <Select placeholder="PRICE">
            <Option value="asc">Low to High</Option>
            <Option value="desc">High to Low</Option>
          </Select>
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
