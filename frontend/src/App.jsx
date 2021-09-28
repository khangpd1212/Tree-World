import {BrowserRouter, Route, Switch} from "react-router-dom"
import {AdminLayout, BaseLayout} from "./components/Layout";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={BaseLayout} />
                <Route path="/users" exact component={BaseLayout} />
                <Route path="/admin" exact component={AdminLayout} />
                <Route path="/admin/users" component={AdminLayout} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;