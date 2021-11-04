import { Col, Row } from "antd";
import BreadCrumb from "components/Base/BreadCrumb";
import Collections from "components/Product/Collections";
import Filter from "components/Product/Filter";
import FormSearch from "components/Product/FormSearch";
import PaginationComponent from "components/Product/PaginationComponent";
import ProductList from "components/Product/ProductList";
import SideComponent from "components/Product/SideComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setLayoutStatus } from "redux/layout";
import { fetchProducts, selectProducts } from "redux/product";
import "styles/product.scss";
export default function Product() {
  const dispatch = useDispatch();
  const { catalog } = useParams();
  dispatch(setLayoutStatus(true));
  const { productList } = useSelector(selectProducts);

  useEffect(() => {
    if (catalog) {
      let catalog_id = catalog.substring(
        catalog.indexOf(".") + 1,
        catalog.length
      );
      dispatch(fetchProducts({ catalog: catalog_id }));
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, catalog]);
  // console.log(catalog);

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
