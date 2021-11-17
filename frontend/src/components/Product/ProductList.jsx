import { Row } from "antd";
import React from "react";
import ProductComponent from "./ProductComponent";

function ProductList({ products }) {
  return (
    <div className="product__section--list">
      <Row gutter={24}>
        {products &&
          products.map((product, index) => (
            <ProductComponent
              key={index}
              src={product.image[0]}
              name={product.product_name}
              price={product.price}
            />
          ))}
        {/* <ProductComponent
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
        <ProductComponent
          src="/images/product1.png"
          name="Hatiora Gaertneri"
          price="20.00"
        /> */}
      </Row>
    </div>
  );
}

export default ProductList;
