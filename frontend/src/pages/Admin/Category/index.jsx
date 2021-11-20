
import TableCategory from "components/Admin/Category/Table";
import ModalAddProduct from "components/Admin/Product/ModalAddProduct";
import BtnAdd from "components/BtnAdd";
import { useState } from "react";

export default function CategoryAdmin() {
  const [openAddProduct, setOpenAddProduct] = useState(false)

  return (
    <>
      <BtnAdd page='product' setOpen={setOpenAddProduct} />
      <TableCategory />
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