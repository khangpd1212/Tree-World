import "styles/Cart/Cart.scss";
import CartItem from "components/Cart/CartItem";
import CartTotal from "components/Cart/CartTotal";
import BreadCrumb from "components/Base/BreadCrumb";
import SliderProduct from "components/Home/SliderProduct";


export default function Cart() {
    return (
        <div id="cart">
            <BreadCrumb className="breadcrumb" page="Cart" />
            <CartItem />
            <CartTotal />
            <div className="suggest_product">
                <h1 className="suggest_product__heading">Suggest Product</h1>
                <SliderProduct />
            </div>
        </div>
    )
}