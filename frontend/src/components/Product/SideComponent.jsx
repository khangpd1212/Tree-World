import { FilterOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Radio, Row } from "antd";
import React from "react";
import { selectCatalogs } from "redux/catalog";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
const { Sider } = Layout;

function SideComponent() {
  const history = useHistory();
  const { catalogList } = useSelector(selectCatalogs);
  const { catalog } = useParams();
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [err, setErr] = useState(false);
  const handleSubmit = () => {
    console.log(priceMin, priceMax);
    if (Number(priceMin) > Number(priceMax)) {
      setErr(true);
    } else {
      setErr(false);
    }
  };
  // console.log(catalog.substring(catalog.indexOf(".") + 1, catalog.length));
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
          defaultValue=""
          value={catalog ? catalog : ""}
          buttonStyle="solid"
          onChange={(e) => {
            history.push(`/product/${e.target.value}`);
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
            <Input
              type="number"
              placeholder="From"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
            />{" "}
            <span style={{ padding: "0 5px" }}>-</span>
            <Input
              type="number"
              placeholder="To"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
            />
          </Row>
          {err ? (
            <p
              style={{ fontStyle: "italic", color: "red", paddingTop: "10px" }}
            >
              Please fill in the appropriate price
            </p>
          ) : (
            <></>
          )}
          <Row align="middle">
            <Button onClick={handleSubmit}>Apply</Button>
            {err ? (
              <></>
            ) : priceMin === "" || priceMax === "" ? (
              <></>
            ) : (
              <p className="price--range__show">
                ${priceMin} - ${priceMax}
              </p>
            )}
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
