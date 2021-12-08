
import ModalAddProduct from "components/Admin/Product/ModalAddProduct";
import TableProducts from "components/Admin/Product/Table";
import BtnAdd from "components/BtnAdd";
import { useState } from "react";

export default function ProductAdmin() {
    const [openAddProduct, setOpenAddProduct] = useState(false)

    return (
        <>
            <BtnAdd page='product' setOpen={setOpenAddProduct}/>
            <TableProducts />
            <ModalAddProduct
                visible={openAddProduct}
                setVisible={setOpenAddProduct}
            />
        </>
    )
}