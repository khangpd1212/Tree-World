import { Layout } from "antd";
import {
  CategoryAdmin, CommentAdmin, Dashboard, News,
  OrderAdmin,
  ProductAdmin, UserAdmin,
  VoucherAdmin
} from "pages";
import React, { useState } from "react";
import { Route } from "react-router-dom";
import "styles/admin.scss";
import HeaderAdmin from "../Admin/HeaderAdmin";
import SideComponent from "../Admin/SideComponent";
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
            <Route path="/admin" exact component={Dashboard} />
            <Route path="/admin/product" exact component={ProductAdmin} />
            <Route path="/admin/category" exact component={CategoryAdmin} />
            <Route path="/admin/new" exact component={News} />
            <Route path="/admin/voucher" exact component={VoucherAdmin} />
            <Route path="/admin/users" exact component={UserAdmin} />
            <Route path="/admin/comment" exact component={CommentAdmin} />
            <Route path="/admin/order" exact component={OrderAdmin} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
