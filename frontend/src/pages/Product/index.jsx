import { Col, Row } from "antd";
import BreadCrumb from "components/Base/BreadCrumb";
import Collections from "components/Product/Collections";
import Filter from "components/Product/Filter";
import FormSearch from "components/Product/FormSearch";
import PaginationComponent from "components/Product/PaginationComponent";
import ProductList from "components/Product/ProductList";
import SideComponent from "components/Product/SideComponent";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCatalog } from "redux/filter";
import { setLayoutStatus } from "redux/layout";
import { filterProducts, selectProducts } from "redux/product";
import "styles/product.scss";

export default function Product() {
  const dispatch = useDispatch();
  dispatch(setLayoutStatus(true));
  const { productList } = useSelector(selectProducts);
  const { filterProduct } = useSelector(selectProducts);
  const { filterStatus } = useSelector((state) => state.layoutState);
  const filterOptions = useSelector((state) => state.filterState);

  useEffect(() => {
    dispatch(filterProducts(filterOptions));
  }, [dispatch, filterOptions]);
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
            <ProductList products={filterProduct} />
            <PaginationComponent />
          </Col>
        </Row>
      </div>
    </div>
  );
}
