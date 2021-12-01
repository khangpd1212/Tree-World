import TableUser from "components/Admin/Voucher/Table";

export default function UserAdmin() {
  return (
    <>
      <TableUser />
    </>
  );
}
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
