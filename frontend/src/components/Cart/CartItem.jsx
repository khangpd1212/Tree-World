import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { btnIncrement, btnDecrement, removeCart } from 'redux/cart';

import "../../styles/Cart/CartItem.scss";
export default function CartItem(props) {
   const cartItem = props.cartItem;
   const dispath = useDispatch();

   const handleDecrement = (cartItem) => {
      dispath(btnDecrement(cartItem))
   }
   const handleIncrement = (cartItem) => {
      dispath(btnIncrement(cartItem));
   }
   const handleRemoveCart = (cartItem) => {
      dispath(removeCart(cartItem));
   }
   const handleChange = (e) => {
      e.target.value = cartItem.quantity;
   }
   return (
      <Row className="cart__product--main" align="middle" >
         <Col span={10} className="main__img">
            <input type="checkbox" />
            <img src={cartItem.image[0]} alt="" />
            <h2>{cartItem.product_name}</h2>
         </Col>
         <Col span={14}>
            <Row className="main__list" justify="space-between" align="middle">
               <Col className="main__list--color">
                  <span>{cartItem.color[0]}</span>
               </Col>
               <Col className="main__list--price">
                  <span>${cartItem.price}</span>
               </Col>
               <Col>
                  <div className="btn-sl">
                     <button className="btn-decrement" onClick={() => handleDecrement(cartItem)}>-</button>
                     <input type="number" onChange={handleChange} value={cartItem.quantity} />
                     <button className="btn-increment" onClick={() => handleIncrement(cartItem)}>+</button>
                  </div>
               </Col>
               <Col className="main__list--total">
                  <span>${cartItem.price * cartItem.quantity}</span>
               </Col>
               <Col className="main__list--delete">
                  <button className="btn_remove" onClick={() => handleRemoveCart(cartItem)}>X</button>
               </Col>
            </Row>
         </Col>
      </Row>
   )
}
