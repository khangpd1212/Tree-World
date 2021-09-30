import BreadCrumb from "components/Base/BreadCrumb";
import Collections from "components/Product/Collections";
import FormSearch from "components/Product/FormSearch";
import SideComponent from "components/Product/SideComponent";
import "styles/product.scss";
export default function Product() {
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
