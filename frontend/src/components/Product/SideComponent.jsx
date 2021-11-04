import { FilterOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Radio, Row } from "antd";
import React, { useState, useEffect } from "react";
import { selectCatalogs } from "redux/catalog";
import { useSelector } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router-dom";
const { Sider } = Layout;

function SideComponent() {
  const history = useHistory();
  const params = useParams();
  const { catalogList } = useSelector(selectCatalogs);
  const { catalog } = params;
  // let location = useLocation();
  const [state, setState] = useState(catalog);
  useEffect(() => {
    setState(catalog);
  }, [catalog]);
  console.log(catalog, state);
  return (
    <div className="tabletHidden">
      <div className="product__section--title">
        <h3>
          search filter <FilterOutlined />
        </h3>
      </div>
      <Sider className="site-layout-background">
        <h3 className="side__title">Categories</h3>
        <Radio.Group
          defaultValue={state}
          buttonStyle="solid"
          onChange={(e) => {
            history.push(`/product/${e.target.value}`);
            // setState({status: true, content: e.target.value})
          }}
        >
          {catalogList &&
            catalogList.map((catalog, index) => (
              <Radio.Button
                value={`${catalog.catalog_name}-cat.${catalog._id}`}
                key={index}
              >
                {catalog.catalog_name}
              </Radio.Button>
            ))}
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
