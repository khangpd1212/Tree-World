import { Row } from "antd";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProducts, selectProducts } from "redux/product";
import ProductComponent from "./ProductComponent";

function ProductList() {
  const { productList } = useSelector(selectProducts);

  console.log(productList);
  return (
    <div className="product__section--list">
      <Row justify="space-between">
        {productList &&
          productList.map((product, index) => (
            <ProductComponent
              key={index}
              src={product.image[0]}
              name={product.product_name}
              price={product.price}
            />
          ))}
        <ProductComponent
          src="/images/product1.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product2.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product3.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product1.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product2.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product3.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product1.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product2.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
        <ProductComponent
          src="/images/product3.png"
          name="Hatiora Gaertneri"
          price="20.00"
        />
      </Row>
    </div>
  );
}

export default ProductList;
