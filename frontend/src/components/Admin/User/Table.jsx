import { Switch, Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchGetUser, selectUsers } from "redux/user";
import { requests } from "utils/axios";

export default function TableUser() {
  const dispatch = useDispatch();
  const { userList } = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchGetUser());
  }, [dispatch]);

  const handleChangeStatus = (e, id) => {
    requests.editUser({ status: e }, id).then((res) => {
      if (res) {
        dispatch(fetchGetUser());
        toast.success(`Changed status`, {
          autoClose: 2000,
        });
      }
    });
  };
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
    {
      title: "Status",
      key: "status",
      render: (text, record) => (
        <Switch
          defaultChecked={true}
          onChange={(e) => {
            handleChangeStatus(e, record._id);
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={userList} />
    </>
  );
}
