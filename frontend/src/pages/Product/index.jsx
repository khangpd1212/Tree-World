import { Col, Row } from "antd";
import BreadCrumb from "components/Base/BreadCrumb";
import Collections from "components/Product/Collections";
import Filter from "components/Product/Filter";
import FormSearch from "components/Product/FormSearch";
import PaginationComponent from "components/Product/PaginationComponent";
import ProductList from "components/Product/ProductList";
import SideComponent from "components/Product/SideComponent";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { setLayoutStatus, setUrlStatus } from "redux/layout";
import { fetchProducts, selectProducts } from "redux/product";
import "styles/product.scss";

function useQuery(search) {
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Product() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { catalog } = useParams();
  dispatch(setLayoutStatus(true));

  const { productList } = useSelector(selectProducts);
  const layout = useSelector((state) => state.layoutState);
  const query = useQuery(location.search);
  const getOptions = (query, search) => {
    let options = {};
    if (catalog) {
      let catalog_id = catalog.substring(
        catalog.indexOf(".") + 1,
        catalog.length
      );
      options = { catalog: catalog_id };
      if (search !== "") {
        for (const [key, value] of query) {
          options[key] = value;
        }
      }
    } else {
      if (search !== "") {
        for (const [key, value] of query) {
          options[key] = value;
        }
      }
    }

    return options;
  };

  useEffect(() => {
    new Promise((res, rej) => {
      res(dispatch(setUrlStatus(location)));
    })
      .then(() => {
        return getOptions(query, location.search);
      })
      .then((res) => {
        console.log(res);
        dispatch(fetchProducts(res));
      });
    // setTimeout(() => {
    //   const options = getOptions(query, layout.urlStatus.search);
    //   dispatch(fetchProducts(options));
    //   console.log(options);
    // }, 5000);
  }, [dispatch, catalog, location, query, layout.urlStatus.search]);
  // console.log(options);
  return (
    <div className="product">
      <BreadCrumb page="Product" />
      <FormSearch />
      <Collections />
      <div className="product__section">
        <Row>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <SideComponent />
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <Filter />
            <ProductList products={productList} />
            <PaginationComponent />
          </Col>
        </Row>
      </div>
    </div>
  );
}
