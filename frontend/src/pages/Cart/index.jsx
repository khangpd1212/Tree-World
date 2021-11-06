import "styles/Cart/Cart.scss";
import { useSelector } from "react-redux";
import CartItem from "components/Cart/CartItem";
import BreadCrumb from "components/Base/BreadCrumb";
import SliderProduct from "components/Home/SliderProduct";
import { Col, Row } from "antd";
import { selectCarts } from "redux/cart";

export default function Cart() {
    const {cartItems} = useSelector(selectCarts);
    return (
        <div id="cart">
            <BreadCrumb className="breadcrumb" page="Cart" />
            <div className="cart__product">
                <Row className="cart__product--title">
                    <Col span={10}><h1 className="title__only" >Your Product</h1></Col>
                    <Col span={14} className="title__content">
                        <h2>Color</h2>
                        <h2>Price</h2>
                        <h2>Quantity</h2>
                        <h2>Total</h2>
                        <h2>Action</h2>
                    </Col>
                </Row>
                {
                    cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <h2>Your cart is currently empty</h2>
                        </div>
                    ) : (
                    cartItems &&
                    cartItems.map((cartItem, index) => <CartItem
                        key={index} 
                        cartItem={cartItem}
                    />)
                    )
                }
            </div>
            <div className="cart__total">
                <Row className="cart__total--bottom" align="middle">
                    <Col md={16}>
                        <div className="total--left">
                            <input type="checkbox" id="checkbox_total" />
                            <label className="total--left__text" htmlFor="checkbox_total">Select All Products</label>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="total--right">
                            <span className="total__all">Total: <span className="price">$28.00</span></span>
                            <button className="cart__button">Buy now</button>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="suggest_product">
                <h1 className="suggest_product__heading">Suggest Product</h1>
                <SliderProduct />
            </div>
        </div>
    )
}