
import TableOrder from "components/Admin/Order/Table";

export default function OrderAdmin() {

  return (
    <>
      <TableOrder />
    </>
  )
}
function onChange(checked) {
  console.log(`switch to ${checked}`);
}