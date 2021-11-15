import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectCarts, addItemToCart, btnDecrement, removeCart } from 'redux/cart';
import { useState, useEffect } from "react";

import "../../styles/Cart/CartItem.scss";

export default function CartItem() {

   const { cartItems } = useSelector(selectCarts);
   const dispath = useDispatch();
   const [state, setstate] = useState(cartItems)

   const handleDecrement = (cartItems) => {
      dispath(btnDecrement(cartItems))
   }
   const handleIncrement = (cartItems) => {
      dispath(addItemToCart(cartItems));
   }
   const handleRemoveCart = (cartItems) => {
      dispath(removeCart(cartItems));
   }
   const handleChange = (e) => {
      e.target.value = cartItems.quantity;
   }
   
   // re-render
   useEffect(() => {
      setstate(cartItems);
      return () => {
         setstate([]);
      }
   }, [cartItems])


   return (
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
               cartItems.map((cartItem, index) => (
               <Row key={index} className="cart__product--main" align="middle" >
                     <Col span={10} className="main__img">
                        <input type="checkbox" />
                        <img src={cartItem.image[0]} alt="" />
                        <h2>{cartItem.product_name}</h2>
                     </Col>
                     <Col span={14}>
                        <Row className="main__list" justify="space-between" align="middle">
                           <Col 
                              className="main__list--color" 
                              style={{ 
                              border: "1px solid gray", 
                              backgroundColor: cartItem.color[0]
                              }}>
                           </Col>
                           <Col className="main__list--price">
                              <span>${cartItem.price}</span>
                           </Col>
                           <Col>
                              <div className="btn-sl">
                                 <button className="btn-decrement" 
                                 onClick={() => handleDecrement(cartItem)}>
                                    -
                                 </button>

                                 <input type="number" 
                                    onChange={handleChange} 
                                    value={cartItem.quantity}
                                 />

                                 <button className="btn-increment" 
                                 onClick={() => handleIncrement(cartItem)}>
                                    +
                                 </button>
                              </div>
                           </Col>
                           <Col className="main__list--total">
                              <span>${cartItem.price * cartItem.quantity}</span>
                           </Col>
                           <Col className="main__list--delete">
                              <button className="btn_remove" 
                              onClick={() => handleRemoveCart(cartItem)}>
                                 X
                              </button>
                           </Col>
                        </Row>
                     </Col>
                  </Row>
               ))
            )
         }
      </div>
   )
}
