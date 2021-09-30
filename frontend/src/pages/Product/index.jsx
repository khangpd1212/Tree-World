import BreadCrumb from "components/Base/BreadCrumb";
import Collections from "components/Product/Collections";
import FormSearch from "components/Product/FormSearch";
import "styles/product.scss";
export default function Product() {
  return (
    <div className="product">
      <BreadCrumb page="Product" />
      <FormSearch />
      <Collections />
    </div>
  );
}
