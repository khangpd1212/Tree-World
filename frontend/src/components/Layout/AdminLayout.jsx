import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { fetchProducts } from "redux/product";
import { fetchCatalogs } from "redux/catalog";
import { fetchGetUser } from "redux/user";
import { getOrders } from "redux/order";
import { getOrderDetail } from "redux/order_detail";
import { getAddress } from "redux/address";
import { fetchGetVoucher } from "redux/voucher";
import { fetchGetComment } from 'redux/comment';
import "styles/admin.scss";
import {
  CategoryAdmin,
  News,
  OrderAdmin,
  ProductAdmin,
  Dashboard,
  UserAdmin,
  VoucherAdmin,
  CommentAdmin,
} from "pages";
import HeaderAdmin from "../Admin/HeaderAdmin";
import SideComponent from "../Admin/SideComponent";
const { Content } = Layout;

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetComment())
    dispatch(fetchGetUser());
    dispatch(fetchProducts());
    dispatch(fetchCatalogs());
    dispatch(getOrders());
    dispatch(getOrderDetail());
    dispatch(getAddress());
    dispatch(fetchGetVoucher());
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
