import { Layout } from "antd";
import Backtop from "components/Base/Backtop";
import BaseFooter from "components/Base/BaseFooter";
import BaseHeader from "components/Base/BaseHeader";
import Loading from "components/Base/Loading";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { getAddress } from "redux/address";
import { fetchCatalogs } from "redux/catalog";
import { fetchGetComment } from "redux/comment";
import { getOrders } from "redux/order";
import { getOrderDetail } from "redux/order_detail";
import { fetchProducts } from "redux/product";
import { fetchGetUser } from "redux/user";
import { fetchGetVoucher } from "redux/voucher";
import "styles/BaseLayout.scss";
import "styles/global.scss";
import "styles/handleDarkMode.scss";

const { Content } = Layout;
const Home = lazy(() => import("pages/Home"));
const Product = lazy(() => import("pages/Product"));
const Detail = lazy(() => import("pages/Detail"));
const Payment = lazy(() => import("pages/Payment"));
const Cart = lazy(() => import("pages/Cart"));
const Blog = lazy(() => import("pages/Blog"));
const About = lazy(() => import("pages/About"));
const LoginDesktop = lazy(() => import("pages/Login/LoginDesktop"));
const SignUpDesktop = lazy(() => import("pages/SignUp/SignUpDesktop"));
const ForgetPassword = lazy(() => import("pages/Login/ForgetPassword"));
const Contact = lazy(() => import("pages/Contact"));

export default function BaseLayout() {
  const dispatch = useDispatch();
  const layout = useSelector((state) => state.layoutState.layoutStatus);
  const [themeState, setThemeState] = useState(false);

  useEffect(() => {
    const getTheme = localStorage.getItem("Theme");
    if (getTheme === "dark") {
      setThemeState(true);
    }
  }, []);

  useEffect(() => {
    if (themeState) {
      localStorage.setItem("Theme", "dark");
      document.body.classList.add("dark");
    } else {
      localStorage.setItem("Theme", "light");
      document.body.classList.remove("dark");
    }
  }, [themeState]);

  useEffect(() => {
    dispatch(fetchGetUser());
    dispatch(fetchProducts());
    dispatch(fetchCatalogs());
    dispatch(getOrders());
    dispatch(getOrderDetail());
    dispatch(getAddress());
    dispatch(fetchGetComment());
    dispatch(fetchGetVoucher());
  }, [dispatch]);

  return (
    <div className="root-base">
      <div className="theme-witch-wrapper">
        <label htmlFor="checkbox" className="theme-switch">
          <input
            type="checkbox"
            id="checkbox"
            checked={themeState}
            onChange={() => themeState}
            onClick={() => setThemeState(!themeState)}
          />
          <div className="slider round"></div>
        </label>
      </div>
      <Layout>
        <BaseHeader />
        <Content>
          <div className="head">
            <Suspense fallback={<Loading/>}>
              <LoginDesktop />
              <SignUpDesktop />
              <ForgetPassword />
              <Route path="/" exact component={Home} />
              <Route path="/reset-password" exact component={Home} />
              <Route path="/about" exact component={About} />
              <Route path="/product" exact component={Product} />
              <Route path="/product/:catalog" exact component={Product} />
              <Route path="/detail" exact component={Detail} />
              <Route path="/detail/:id" exact component={Detail} />
              <Route path="/cart" exact component={Cart} />
              <Route path="/payment" exact component={Payment} />
              <Route path="/blog" exact component={Blog} />
              <Route path="/contact" exact component={Contact} />
              {layout ? <div className="head__change"></div> : <></>}
            </Suspense>
          </div>
        </Content>
        <BaseFooter />
        <Backtop />
      </Layout>
    </div>
  );
}
