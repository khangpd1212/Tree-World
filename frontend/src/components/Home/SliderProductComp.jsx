import React from "react";
import {
  HeartFilled,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "redux/cart";
import { selectUsers } from "redux/user";
import { ShowModalLogin } from "redux/modal";
import { Link } from "react-router-dom";

export default function SliderProductComp(props) {
  const { userItems } = useSelector(selectUsers);

  const prod = props.product;
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (Object.values(userItems).length === 0) {
      dispatch(ShowModalLogin(true));
      toast.error(`You need to login`, {
        position: "bottom-left",
        autoClose: 2000,
      });
    } else {
      dispatch(ShowModalLogin(false));
      dispatch(
        addItemToCart({ product: prod, quantity: 1, pickColor: prod.color[0] })
      );
    }
  };
  return (
    <div className="h_product-flex">
      <div className="h_product-flex_hover">
        <Link to={`detail/${prod._id}`}>
          <img src={prod.image[0]} alt="img_product" />
        </Link>
        <div className="h_product-flex_icon">
          <div className="icon-like">
            <HeartFilled className="icon-card" />
          </div>
        </div>
        <div className="h_product-flex_sidebar">
          <div className="icon-cart icon_hidden" onClick={handleAddToCart}>
            <ShoppingCartOutlined className="icon-card " />
          </div>
          <div className="icon_hidden">
            <ShoppingOutlined className="icon-card " />
          </div>
        </div>
      </div>
      <div className="h_product-flex_content">
        <p>{prod.product_name}</p>
        <span>${prod.price}</span>
      </div>
    </div>
  );
}
