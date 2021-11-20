
import ModalAddProduct from "components/Admin/Product/ModalAddProduct";
import TableUser from "components/Admin/User/Table";
import BtnAdd from "components/BtnAdd";
import { useState } from "react";

export default function User() {
    const [openAddProduct, setOpenAddProduct] = useState(false)

    return (
        <>
            <BtnAdd page='product' setOpen={setOpenAddProduct} />
            <TableUser />
            <ModalAddProduct
                visible={openAddProduct}
                setVisible={setOpenAddProduct}
            />
        </>
    )
}
function onChange(checked) {
    console.log(`switch to ${checked}`);
}