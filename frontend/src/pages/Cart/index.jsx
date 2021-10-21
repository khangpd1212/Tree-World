import "styles/cart.scss";
import BreadCrumb from "components/Base/BreadCrumb";
import { Col, Row } from "antd";

export default function Cart(){
    return(
        <div className="cart">
            <BreadCrumb className="breadcrumb" page="Cart" />
            <div className="cart__product">
                <Row className="cart__product--top">
                    <Col xs={10}>
                        <h1>Your Product</h1>
                        <div className="product__left">
                            <img src="/images/product1.png" alt=""/>
                            <h2>Product name</h2>
                        </div>
                    </Col>
                    <Col xs={14}>
                        <div className="product__right">
                            <div className="product__right--title">
                                <h2>Color</h2>
                                <h2>Price</h2>
                                <h2>Quantity</h2>
                                <h2>Total</h2>
                            </div>
                            <div className="product__right--content">
                                    <p>Blue</p>
                                    <p>$28.00</p>
                                    <div className="btn-sl">
                                        <input type="number" value="1"/>
                                    </div>
                                    <p>$28.00</p>
                            </div>
                            
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}