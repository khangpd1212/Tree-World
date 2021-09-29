import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "styles/breadcrumb.scss";
function BreadCrumb({ page }) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to={"/"}>Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to={"/product"}>{page}</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadCrumb;
