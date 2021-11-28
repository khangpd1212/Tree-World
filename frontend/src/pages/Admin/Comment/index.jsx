
import TableComment from "components/Admin/Comment/Table";


export default function CommentAdmin() {
    

    return (
        <>
           
            <TableComment />
            
        </>
    )
}
function onChange(checked) {
    console.log(`switch to ${checked}`);
}