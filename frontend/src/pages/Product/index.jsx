import BreadCrumb from "components/Base/BreadCrumb";
import Collections from "components/Product/Collections";
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
        <SideComponent />
      </div>
    </div>
  );
}
