import React, { useState, useEffect } from "react";
import "styles/BaseLayout.scss";
import "../../styles/handleDarkMode.scss";
import "styles/global.scss";
import { Layout } from "antd";
import Backtop from "components/Base/Backtop";
import BaseFooter from "components/Base/BaseFooter";
import BaseHeader from "components/Base/BaseHeader";
import { Route } from "react-router-dom";
import {
  Home,
  Users,
  Product,
  Cart,
  Detail,
  Contact,
  Payment,
  About,
} from "../../pages";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "redux/product";
import { fetchCatalogs } from "redux/catalog";
import { fetchUsers } from "redux/user";
const { Content } = Layout;
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
    // dispatch(fetchProducts());
    dispatch(fetchCatalogs());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="root-base">
      <div className="theme-witch-wrapper">
        <label htmlFor="checkbox" className="theme-switch">
          <input
            type="checkbox"
            id="checkbox"
            checked={themeState}
            onClick={() => setThemeState(!themeState)}
          />
          <div className="slider round"></div>
        </label>
      </div>
      <Layout>
        <BaseHeader />
        <Content>
          <div className="head">
            <Route path="/" exact component={Home} />
            <Route path="/users" exact component={Users} />
            <Route path="/product" exact component={Product} />
            <Route path="/product/:catalog" exact component={Product} />
            <Route path="/detail" exact component={Detail} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/payment" exact component={Payment} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />
            {layout ? <div className="head__change"></div> : <></>}
          </div>
        </Content>
        <BaseFooter />
        <Backtop />
      </Layout>
    </div>
  );
}
