import "styles/Cart/Cart.scss";
import CartItem from "components/Cart/CartItem";
import CartTotal from "components/Cart/CartTotal";
import BreadCrumb from "components/Base/BreadCrumb";
import SliderProduct from "components/Home/SliderProduct";
import { selectProducts } from "redux/product";
import { selectUsers } from "redux/user";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ShowModalLogin } from "redux/modal";

export default function Cart() {
  const dispatch = useDispatch();

  const { productList } = useSelector(selectProducts);
  const showProduct = productList.filter((item) => item.status === true);
  const { userItems } = useSelector(selectUsers);

  const tokenLocal = localStorage.getItem("token");
  let token = tokenLocal ? JSON.parse(tokenLocal) : userItems.accessToken;
  if (!token) {
    dispatch(ShowModalLogin(true));
    return (
      <Redirect
        to={{
          pathname: document.referrer,
        }}
      />
    );
  }
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
