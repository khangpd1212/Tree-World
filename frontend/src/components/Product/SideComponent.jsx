import { FilterOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Radio, Row } from "antd";
import React from "react";
import { selectCatalogs } from 'redux/catalog';
import { useSelector } from "react-redux";
const { Sider } = Layout;

function SideComponent() {
  const { catalogList } = useSelector(selectCatalogs);
  return (
    <div className="tabletHidden">
      <div className="product__section--title">
        <h3>
          search filter <FilterOutlined />
        </h3>
      </div>
      <Sider className="site-layout-background">
        <h3 className="side__title">Categories</h3>
        <Radio.Group defaultValue={0} buttonStyle="solid">
          {
            catalogList && catalogList.map((catalog, index) => (
              <Radio.Button
                value={index} 
                key={index}>
                {catalog.catalog_name}
              </Radio.Button>
            ))
          }
        </Radio.Group>
        <h3 className="side__title">Price range</h3>
        <div className="form__price--range">
          <Row>
            <Input type="number" placeholder="From" />{" "}
            <span style={{ padding: "0 5px" }}>-</span>
            <Input type="number" placeholder="To" />
          </Row>
          <Row align="middle">
            <Button>Apply</Button>
            <p className="price--range__show">$50 - $300</p>
          </Row>
        </div>
        <h3 className="side__title">tags</h3>
        <div className="side__tags">
          <p>
            Accessories, agla-
            <br />
            onema, air purifying plants, Bonsai cactus, Calathea, Combo Offers,
            Creeper, Plants, Dracaena, Exotic
          </p>
        </div>
      </Sider>
    </div>
  );
}

export default SideComponent;
