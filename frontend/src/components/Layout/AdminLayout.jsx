import { Layout } from "antd";
import {
  CategoryAdmin, CommentAdmin, Dashboard, News,
  OrderAdmin,
  ProductAdmin, UserAdmin,
  VoucherAdmin
} from "pages";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { fetchBlogs } from "redux/blog";
import { fetchGetComment } from 'redux/comment';
import { fetchGetVoucher } from "redux/voucher";
import { fetchProducts } from "redux/product";
import "styles/admin.scss";
import HeaderAdmin from "../Admin/HeaderAdmin";
import SideComponent from "../Admin/SideComponent";
import { getOrders } from "redux/order";
import { getOrderDetail } from "redux/order_detail";
import { fetchCatalogs } from "redux/catalog";
const { Content } = Layout;

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetComment())
    dispatch(fetchBlogs());
    dispatch(fetchGetVoucher());
    dispatch(fetchProducts());
    dispatch(getOrders());
    dispatch(fetchCatalogs());
    dispatch(getOrderDetail());
  }, [dispatch]);

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
