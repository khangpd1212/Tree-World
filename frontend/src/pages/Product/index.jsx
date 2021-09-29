import BreadCrumb from "components/Base/BreadCrumb";
import FormSearch from "components/Product/FormSearch";
import "styles/product.scss";
export default function Product() {
  return (
    <div className="product">
      <BreadCrumb page="Product" />
      <FormSearch />
    </div>
  );
}
