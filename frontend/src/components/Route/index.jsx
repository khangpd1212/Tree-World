import {Switch, Route} from "react-router-dom";
import {Home, Panel, Users} from "pages";

export default function RoutePage() {
    return <div className="main">
        <Switch>
            <Route path="/admin">
               <Panel/>
            </Route>
            <Route path="/users">
                <Users/>
            </Route>
            <Route path="/">
                <Home/>
            </Route>
        </Switch>
    </div>
}