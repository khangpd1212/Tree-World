import BaseFooter from "components/Base/BaseFooter";
import BaseHeader from "components/Base/BaseHeader";
import { Link, Route } from "react-router-dom";
import { Home, Users } from "../../pages";

export default function BaseLayout() {
  return (
    <div className="root-base">
      <BaseHeader />
      <div className="head">
        <h2>HOME</h2>
        <Link to={"/"}>home</Link>
        <Link to={"/admin"}>admin</Link>
        <Link to={"/users"}>login</Link>
      </div>
      <Route path="/" component={Home} />
      <Route path="/users" component={Users} />
      <BaseFooter />
    </div>
  );
}
