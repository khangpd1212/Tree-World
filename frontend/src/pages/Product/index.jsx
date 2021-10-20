import { Col, Row } from "antd";
import BreadCrumb from "components/Base/BreadCrumb";
import Collections from "components/Product/Collections";
import Filter from "components/Product/Filter";
import FormSearch from "components/Product/FormSearch";
import SideComponent from "components/Product/SideComponent";
import { useDispatch } from "react-redux";
import { setLayoutStatus } from "redux/layout";
import "styles/product.scss";
export default function Product() {
  const dispatch = useDispatch();
  dispatch(setLayoutStatus(true));
  return (
    <div className="product">
      <BreadCrumb page="Product" />
      <FormSearch />
      <Collections />
      <div className="product__section">
        <Row>
          <Col lg={6} xl={6}>
            <SideComponent />
          </Col>
          <Col lg={18} xl={18}>
            <Filter />
          </Col>
        </Row>
      </div>
    </div>
  );
}
