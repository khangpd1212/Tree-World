
import ModalAddVoucher from "components/Admin/Voucher/ModalAddVoucher";
import TableVoucher from "components/Admin/Voucher/Table";
import BtnAdd from "components/BtnAdd";
import { useState } from "react";

export default function VoucherAdmin() {
    const [openAddVoucher, setOpenAddVoucher] = useState(false)

    return (
        <>
            <BtnAdd page='voucher' setOpen={setOpenAddVoucher} />
            <TableVoucher />
            <ModalAddVoucher
                visible={openAddVoucher}
                setVisible={setOpenAddVoucher}
            />
        </>
    )
}