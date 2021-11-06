
import TableProducts from "components/Admin/Product/Table";
import BtnAdd from "components/BtnAdd";

export default function ProductAdmin() {

    return (
        <>
            <BtnAdd page='product' />
            <TableProducts />
        </>
    )
}
function onChange(checked) {
    console.log(`switch to ${checked}`);
}