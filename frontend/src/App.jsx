import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AdminLayout, BaseLayout, LoginLayout } from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={BaseLayout} />
        <Route path="/users" exact component={BaseLayout} />
        <Route path="/product" exact component={BaseLayout} />
        <Route path="/cart" exact component={BaseLayout} />
        <Route path="/login" exact component={LoginLayout} />
        <Route path="/admin" exact component={AdminLayout} />
        <Route path="/admin/users" component={AdminLayout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
