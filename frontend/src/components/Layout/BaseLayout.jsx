import { Layout } from "antd";
import Backtop from "components/Base/Backtop";
import BaseFooter from "components/Base/BaseFooter";
import BaseHeader from "components/Base/BaseHeader";
import { Route } from "react-router-dom";
import { Home, Users, Product, Login } from "../../pages";
const { Content } = Layout;
export default function BaseLayout() {
  return (
    <Layout>
      <div className="root-base">
        <BaseHeader />
        <Content style={{ marginTop: 120 }}>
          <div className="head">
            <Route path="/" exact component={Home} />
            <Route path="/users" exact component={Users} />
            <Route path="/login" exact component={Login} />
            <Route path="/product" exact component={Product} />
          </div>
        </Content>
        <BaseFooter />
        <Backtop />
      </div>
    </Layout>
  );
}
