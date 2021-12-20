
import TableCategory from "components/Admin/Category/Table";
import ModalAddCategory from "components/Admin/Category/ModalAddCategory";
import BtnAdd from "components/BtnAdd";
import { useState } from "react";

export default function CategoryAdmin() {
  const [openAddCategory, setOpenAddCategory] = useState(false)

  return (
    <>
      <BtnAdd page='product' setOpen={setOpenAddCategory} />
      <TableCategory />
      <ModalAddCategory
        visible={openAddCategory}
        setVisible={setOpenAddCategory}
      />
    </>
  )
}