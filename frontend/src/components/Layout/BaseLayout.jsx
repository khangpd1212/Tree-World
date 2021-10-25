import React, { useState, useEffect } from 'react'
import '../../styles/handleDarkMode.scss';
import { Layout } from "antd";
import Backtop from "components/Base/Backtop";
import BaseFooter from "components/Base/BaseFooter";
import BaseHeader from "components/Base/BaseHeader";
import { Route } from "react-router-dom";
import { Home, Users, Product, Cart,Detail, Contact } from "../../pages";
import "styles/BaseLayout.scss";

import '../../styles/handleDarkMode.scss';
import { useSelector } from "react-redux";
const { Content } = Layout;
export default function BaseLayout() {
  const layout = useSelector((state) => state.layoutState.layoutStatus);

  const [themeState, setThemeState] = useState(false);
  useEffect(() => {
    const getTheme = localStorage.getItem('Theme');
    if (getTheme === 'dark') {
      setThemeState(true)
    }
  }, []);
  useEffect(() => {
    if (themeState) {
      localStorage.setItem("Theme", "dark");
      document.body.classList.add('dark');
    } else {
      localStorage.setItem("Theme", "light");
      document.body.classList.remove("dark");
    }
  }, [themeState]);
  return (
    <div className="root-base">
      <div className="theme-witch-wrapper">
        <label htmlFor="checkbox" className="theme-switch">
          <input type="checkbox" id="checkbox" onClick={() => setThemeState(!themeState)} />
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
            <Route path="/detail" exact component={Detail} />
            <Route path="/cart" exact component={Cart} />
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
