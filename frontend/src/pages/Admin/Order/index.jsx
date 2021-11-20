
import TableOrder from "components/Admin/Order/Table";
import ModalAddProduct from "components/Admin/Product/ModalAddProduct";
import BtnAdd from "components/BtnAdd";
import { useState } from "react";

export default function ProductAdmin() {
  const [openAddProduct, setOpenAddProduct] = useState(false)

  return (
    <>
      <BtnAdd page='product' setOpen={setOpenAddProduct} />
      <TableOrder />
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