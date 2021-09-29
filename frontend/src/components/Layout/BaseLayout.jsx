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
        <Content style={{ marginTop: 120 }}>
          <div className="head">
            <Route path="/" exact component={Home} />
            <Route path="/users" exact component={Users} />
          </div>
        </Content>
        <BaseFooter />
      </div>
    </Layout>
  );
}
