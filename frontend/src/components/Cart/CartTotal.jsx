import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectCarts, getTotals } from 'redux/cart';
import { useEffect } from "react";

import "styles/Cart/CartTotal.scss";
import { Link } from "react-router-dom";

export default function CartTotal() {
   const { cartTotalAmount, cartItems } = useSelector(selectCarts);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getTotals());
   }, [cartItems]);

   return (
      <div className="cart__total">
         <Row className="cart__total--bottom" align="middle">
            <Col md={16}>
            </Col>
            <Col md={8}>
               <div className="total--right">
                  <span className="total__all">Total: <span className="price">${cartTotalAmount.total}</span></span>
                  <Link to="/payment">
                     <button className="cart__button">Buy now</button>
                  </Link>
               </div>
            </Col>
         </Row>
      </div>
   )
}
