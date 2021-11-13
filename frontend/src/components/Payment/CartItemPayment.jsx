import { Col, Row, Input} from "antd";
import CartItem from "components/Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { selectCarts, getTotals } from 'redux/cart';
import { useEffect } from "react";

export default function CartItemPayment() {
    const { TextArea } = Input;
    const { cartTotalAmount, cartItems } = useSelector(selectCarts);
    const dispath = useDispatch();

    useEffect(() => {
        dispath(getTotals());
    }, [cartItems]);

    return (
        <div className="cartItemPayment">
            <CartItem />
            <div className="product__items--container">
                <Row gutter={30}>
                    <Col span={13}>
                        <div className="left__items">
                            <TextArea
                                style={{
                                    border: "1px solid #ded9d9", background: "#f7f5f5"
                                }}
                                rows={6} 
                                allowClear={true} 
                                placeholder="Your message"
                            />
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
                    total: ${cartTotalAmount.total}
                </span>
            </div>
        </div>

    )
}