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
import { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  //pagination
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentFilterProduct = filterProduct.slice(indexOfFirst, indexOfLast);
  const currentProduct = productList.slice(indexOfFirst, indexOfLast);
  const currentSearchProduct = searchProduct.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
            <Filter
              total={
                filterStatus
                  ? filterProduct.length
                  : searchStatus.length
                  ? searchProduct.length
                  : productList.length
              }
              currentPage={currentPage}
              pageSize={pageSize}
              paginate={paginate}
            />
            {loading === "loaded" ? (
              <>
                <ProductList
                  products={
                    searchStatus ? currentSearchProduct : currentFilterProduct
                  }
                />
                <PaginationComponent
                  total={
                    filterStatus
                      ? filterProduct.length
                      : searchStatus.length
                      ? searchProduct.length
                      : productList.length
                  }
                  currentPage={currentPage}
                  pageSize={pageSize}
                  paginate={paginate}
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
