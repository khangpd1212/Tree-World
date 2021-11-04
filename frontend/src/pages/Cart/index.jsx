import "styles/cart.scss";

import BreadCrumb from "components/Base/BreadCrumb";
import SliderProduct from "components/Home/SliderProduct";
import { Col, Row } from "antd";
export default function Cart() {
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
                <Row className="cart__product--main" align="middle">
                    <Col span={10} className="main__img">
                        <input type="checkbox" />
                        <img src="/images/product1.png" alt="" />
                        <h2>Product name</h2>
                    </Col>
                    <Col span={14}>
                        <Row className="main__list" justify="space-between" align="middle">
                            <Col className="main__list--color">
                                <span>Blue</span>
                            </Col>
                            <Col className="main__list--price">
                                <span>$28.00</span>
                            </Col>
                            <Col>
                                <div className="btn-sl">
                                    <button className="btn-decrement">-</button>
                                    <input type="number" defaultValue="1" />
                                    <button className="btn-increment">+</button>
                                </div>
                            </Col>
                            <Col className="main__list--total">
                                <span>$28.00</span>
                            </Col>
                            <Col className="main__list--delete">
                                <button className="btn_remove">X</button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="cart__product--main" align="middle">
                    <Col span={10} className="main__img">
                        <input type="checkbox" />
                        <img src="/images/product1.png" alt="" />
                        <h2>Product name</h2>
                    </Col>
                    <Col span={14}>
                        <Row className="main__list" justify="space-between" align="middle">
                            <Col className="main__list--color">
                                <span>Blue</span>
                            </Col>
                            <Col className="main__list--price">
                                <span>$28.00</span>
                            </Col>
                            <Col>
                                <div className="btn-sl">
                                    <button className="btn-decrement">-</button>
                                    <input type="number" defaultValue="1" />
                                    <button className="btn-increment">+</button>
                                </div>
                            </Col>
                            <Col className="main__list--total">
                                <span>$28.00</span>
                            </Col>
                            <Col className="main__list--delete">
                                <button className="btn_remove">X</button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
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
            <SliderProduct />
        </div>
    )
}