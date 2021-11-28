import { Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import ProductComponent from "./ProductComponent";

function ProductList({ products }) {
  const { searchStatus } = useSelector((state) => state.layoutState);
  const { keyword } = useSelector((state) => state.layoutState);

  return (
    <div className="product__section--list">
      {searchStatus ? (
        <p style={{ fontStyle: "italic" }}>
          Result of search "
          <strong style={{ fontStyle: "normal" }}>{keyword}</strong>"
        </p>
      ) : (
        <></>
      )}
      <Row gutter={24}>
        {products &&
          products.map((product, index) => {
            if (product.status) {
              return (
                <ProductComponent
                  key={index}
                  src={product.image[0]}
                  name={product.product_name}
                  price={product.price}
                  id={product._id}
                />
              );
            }
          })}
      </Row>
    </div>
  );
}

export default ProductList;
