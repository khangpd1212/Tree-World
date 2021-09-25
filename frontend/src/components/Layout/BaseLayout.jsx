import { Link, Route } from "react-router-dom";
import { Home, Users } from "../../pages";

export default function BaseLayout() {
    return <div className="root-base">
        <div className="head">
            <h2>HOME</h2>
            <Link to={'/'}>home</Link>
            <Link to={'/admin'}>admin</Link>
            <Link to={'/users'}>login</Link>
            <div className="hea-logo">
                <img src="./images/logo.png" alt="logo" />
            </div>
            <div class="hea-right">
                <ul className="hea-wrapper">
            fgfgf
                </ul>
            </div>
        </div>
        <Route path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <div className="footer">
            Footer
        </div>
    </div>
}