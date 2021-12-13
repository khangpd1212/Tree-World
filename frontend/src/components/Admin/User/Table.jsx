import { Table, Switch } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetUser, selectUsers } from "redux/user";
import { requests } from "utils/axios";
import { toast } from "react-toastify";

export default function TableUser() {
  const dispatch = useDispatch();
  const { userList } = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchGetUser());
  }, [dispatch]);

  const handleChangeStatus = (e, id) => {
    requests.editUser({ status: e }, id).then((res) => {
      if (res.updatedVoucher) {
        dispatch(fetchGetUser());
        toast.success(`Changed "${res.updatedUser.voucherCode}" status`, {
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
      sorter: (a, b) => a.username.localeCompare(b.username),
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
          checked={record.status}
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
