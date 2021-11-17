import { LoadingOutlined } from "@ant-design/icons";
import { Col, Row, Spin } from "antd";
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
  const { searchStatus } = useSelector((state) => state.layoutState);
  const { searchProduct } = useSelector(selectProducts);
  const { loading } = useSelector(selectProducts);
  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
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
            {loading === "loaded" ? (
              <>
                <ProductList
                  products={searchStatus ? searchProduct : filterProduct}
                />
                <PaginationComponent
                  products={
                    filterStatus
                      ? filterProduct
                      : searchStatus
                      ? searchProduct
                      : productList
                  }
                />
              </>
            ) : (
              <div className="spinner--loading">
                <Spin indicator={antIcon} />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}
