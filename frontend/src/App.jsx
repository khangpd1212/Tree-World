import {BrowserRouter} from "react-router-dom"
import Route from "components/Route"
import {useEffect} from "react";
import {axiosRequest} from "utils/axios"
import {requests} from "./utils/requests";
function App() {

    useEffect(()=> {
        axiosRequest("get", requests.fetchAllPosts)
            .then(console.log)
    }, [])

    return (
        <BrowserRouter>
            <div className="head">
                Header
            </div>
            <Route/>
            <div className="footer">
                Footer
            </div>
        </BrowserRouter>
    );
}

export default App;
