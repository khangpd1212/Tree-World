import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetUser, selectUsers } from "redux/user";

export default function TableUser() {
  const dispatch = useDispatch();
  const { userList } = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchGetUser());
  }, [dispatch]);

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone_Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={userList} />
    </>
  );
}
