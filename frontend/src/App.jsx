import {BrowserRouter} from "react-router-dom"
import Route from "components/Route"
import {useEffect} from "react";
import {axiosRequest} from "utils/axios"
import {requests} from "utils/requests";
import {useDispatch} from "react-redux";
import {setDataPosts} from "redux/post";
import {useDataPosts} from "redux/post/hook";
import BaseLayout from "components/Layout/BaseLayout";

function App() {
    const dispatch = useDispatch()
    const data = useDataPosts()

    useEffect(() => {
        if (data.length === 0) {
            axiosRequest("get", requests.fetchAllPosts)
                .then(res => dispatch(setDataPosts(res)))
        }
    }, [data])

    return (
        <BrowserRouter>
            <BaseLayout>
                <Route/>
            </BaseLayout>
        </BrowserRouter>
    )
}

export default App;
