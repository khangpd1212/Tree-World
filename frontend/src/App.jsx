import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AdminLayout, BaseLayout, LoginLayout } from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={BaseLayout} />
        <Route path="/users" exact component={BaseLayout} />
        <Route path="/product" exact component={BaseLayout} />
        <Route path="/product/:catalog" exact component={BaseLayout} />
        <Route path="/detail" exact component={BaseLayout} />
        <Route path="/cart" exact component={BaseLayout} />
        <Route path="/about" exact component={BaseLayout} />
        <Route path="/payment" exact component={BaseLayout} />
        <Route path="/contact" exact component={BaseLayout} />
        <Route path="/login" exact component={LoginLayout} />
        {/* <Route path="/sign-up" exact component={LoginLayout} /> */}
        <Route path="/admin" exact component={AdminLayout} />
        <Route path="/admin/dashboard" component={AdminLayout} />
        <Route path="/admin/users" component={AdminLayout} />
        <Route path="/admin/product" exact component={AdminLayout} />
        <Route path="/admin/product/add" exact component={AdminLayout} />
        <Route path="/admin/category" exact component={AdminLayout} />
        <Route path="/admin/category/add" exact component={AdminLayout} />
        <Route path="/admin/order" exact component={AdminLayout} />
        <Route path="/admin/new" exact component={AdminLayout} />
        <Route path="/admin/new/add" exact component={AdminLayout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
