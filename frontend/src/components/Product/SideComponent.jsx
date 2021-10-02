import { FilterOutlined } from "@ant-design/icons";
import { Layout, Radio } from "antd";
import React from "react";
const { Sider } = Layout;
function SideComponent() {
  return (
    <>
      <div className="product__section--title">
        <h3>
          search filter <FilterOutlined />
        </h3>
      </div>
      <Sider className="site-layout-background">
        <h3 className="side__title">Categories</h3>
        <Radio.Group defaultValue="a" buttonStyle="solid">
          <Radio.Button value="a">Accessories(6)</Radio.Button>
          <Radio.Button value="b">Cactus(8)</Radio.Button>
          <Radio.Button value="c">Exotic(16)</Radio.Button>
          <Radio.Button value="d">Flowering(27)</Radio.Button>
          <Radio.Button value="e">Home Decor(2)</Radio.Button>
        </Radio.Group>
        <h3 className="side__title">Price range</h3>
        <h3 className="side__title">tags</h3>
      </Sider>
    </>
  );
}

export default SideComponent;
