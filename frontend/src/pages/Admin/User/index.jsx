
import TableUser from "components/Admin/User/Table";


export default function UserAdmin() {


    return (
        <>
        
            <TableUser />
            
        </>
    )
}
function onChange(checked) {
    console.log(`switch to ${checked}`);
}