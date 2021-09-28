import { Layout } from "antd";
import BaseFooter from "components/Base/BaseFooter";
import BaseHeader from "components/Base/BaseHeader";
import { Link, Route } from "react-router-dom";
import { Home, Users } from "../../pages";
const { Content } = Layout;
export default function BaseLayout() {
  return (
    <Layout>
      <div className="root-base">
        <BaseHeader />
        <Content style={{ padding: "0 50px", marginTop: 120 }}>
          <div className="head">
            <h2>HOME</h2>
            <Route path="/" component={Home} />
            <Route path="/users" component={Users} />
          </div>
        </Content>

        <BaseFooter />
      </div>
    </Layout>
  );
}
