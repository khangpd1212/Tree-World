import { Col, Row } from "antd";

export default function CartItemPayment() {
    return (
            <div className="cartItemPayment">
                <div className="product__items--top">
                    <div className="cart__product">
                        <Row className="cart__product--title">
                            <Col span={10}><h1 className="title__only" >Your Product</h1></Col>
                            <Col span={14} className="title__content">
                                <h2>Color</h2>
                                <h2>Price</h2>
                                <h2>Quantity</h2>
                                <h2>Total</h2>
                            </Col>
                        </Row>
                        <Row className="cart__product--main" align="middle" >
                            <Col span={10} className="main__img">
                                <img src="/images/sp1.png" alt="" />
                                <h2>Succulent plant</h2>
                            </Col>
                            <Col span={14}>
                                <Row className="main__list" justify="space-between" align="middle">
                                    <Col className="main__list--color">
                                        <span>Purple</span>
                                    </Col>
                                    <Col className="main__list--price">
                                        <span>$28.00</span>
                                    </Col>
                                    <Col className="btn-sl">
                                        <span>1</span>
                                    </Col>
                                    <Col className="main__list--total">
                                        <span>$28.00</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="product__items--container">
                    <Row>
                        <Col span={13}>
                            <div className="left__items">
                                <input type="text" placeholder="Your messenger..." />
                            </div>
                        </Col>
                        <Col span={11}>
                            <div className="right__items">
                                <div className="shipping__title">
                                    <span>shipping unit:</span>
                                    <span>shipping fee:</span>
                                </div>
                                <div className="shipping__inf">
                                    <span>International express shipping</span>
                                    <span>Standard Express</span>
                                    <span>Receive goods on Oct 17 - Dec 11</span>
                                    <span>$5.00</span>
                                </div>
                                
                            </div>
                        </Col>
                    </Row> 
                </div>
                <div className="product__items--bottom">
                    <span className="total">
                        total: $33.00
                    </span>
                </div>
            </div>
          
    )
}