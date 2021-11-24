import TagComp from "components/Admin/Dashboard/TagComp"
import TagInfoCart from "components/Admin/Dashboard/TagInfoCart"
import Chart from "components/Admin/Dashboard/Chart"
export default function Dashboard(){
    return (
        <>
            <TagComp/>
            <TagInfoCart/>
            <Chart/>
        </>
    )
}