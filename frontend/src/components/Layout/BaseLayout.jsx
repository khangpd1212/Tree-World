import { Layout } from "antd";
import Backtop from "components/Base/Backtop";
import BaseFooter from "components/Base/BaseFooter";
import BaseHeader from "components/Base/BaseHeader";
import { Route } from "react-router-dom";
import { Home, Users, Product, Cart, Detail, Contact } from "../../pages";
import "styles/BaseLayout.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "redux/product";
const { Content } = Layout;
export default function BaseLayout() {
  const dispatch = useDispatch();
  const layout = useSelector((state) => state.layoutState.layoutStatus);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="root-base">
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
