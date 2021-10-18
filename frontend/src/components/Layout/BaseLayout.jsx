import { Layout } from "antd";
import Backtop from "components/Base/Backtop";
import BaseFooter from "components/Base/BaseFooter";
import BaseHeader from "components/Base/BaseHeader";
import { Route } from "react-router-dom";
import { Home, Users, Product, Cart } from "../../pages";
import "styles/BaseLayout.scss";
import { useSelector } from "react-redux";
const { Content } = Layout;
export default function BaseLayout() {
  const layout = useSelector((state) => state.layoutState.layoutStatus);
  return (
    <div className="root-base">
      <Layout>
        <BaseHeader />
        <Content>
          <div className="head">
            <Route path="/" exact component={Home} />
            <Route path="/users" exact component={Users} />
            <Route path="/product" exact component={Product} />
            <Route path="/cart" exact component={Cart} />
            {layout ? <div className="head__change"></div> : <></>}
          </div>
        </Content>
        <BaseFooter />
        <Backtop />
      </Layout>
    </div>
  );
}
