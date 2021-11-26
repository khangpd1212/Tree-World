import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "styles/breadcrumb.scss";
function BreadCrumb({ page, item }) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to={"/"}>Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to={`/${page.toLowerCase()}`}>{page}</Link>
      </Breadcrumb.Item>
      {item && (
        <Breadcrumb.Item>
          <Link to={`/detail/${item._id}`}>{item.product_name}</Link>
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}

export default BreadCrumb;
