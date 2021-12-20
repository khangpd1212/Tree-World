import "styles/Cart/Cart.scss";
import CartItem from "components/Cart/CartItem";
import CartTotal from "components/Cart/CartTotal";
import BreadCrumb from "components/Base/BreadCrumb";
import SliderProduct from "components/Home/SliderProduct";
import { useSelector } from "react-redux";
import { selectProducts } from "redux/product";

export default function Cart() {
  const { productList } = useSelector(selectProducts);
  const showProduct = productList.filter((item) => item.status === true);
  return (
    <div id="cart">
      <BreadCrumb className="breadcrumb" page="Cart" />
      <div style={{ marginTop: "15px", border: "1px solid #bab3b3" }}>
        <CartItem />
      </div>

      <CartTotal />
      <div className="suggest_product">
        <h1 className="suggest_product__heading">Suggest Product</h1>
        <SliderProduct products={showProduct} />
      </div>
    </div>
  );
}
