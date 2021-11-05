import { Layout } from "antd";
import React, { useState } from "react";
import { Route } from "react-router-dom";
import "styles/admin.scss";
import HeaderAdmin from "../Admin/HeaderAdmin";
import SideComponent from "../Admin/SideComponent";
import { ProductAdmin, CategoryAdmin, AddProduct,AddCategory,New } from "../../pages";
const { Content } = Layout;

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="root-admin">
      <Layout>
        <SideComponent isOpen={isOpen} />
        <Layout className="site-layout">
          <HeaderAdmin isOpen={isOpen} setIsOpen={setIsOpen} />
          <Content>
            <Route path="/admin/product" exact component={ProductAdmin} />
            <Route path="/admin/product/add" exact component={AddProduct} />
            <Route path="/admin/category" exact component={CategoryAdmin} />
            <Route path="/admin/category/add" exact component={AddCategory} />
            <Route path="/admin/news" exact component={New} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
