import { Table, Switch } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetUser, selectUsers } from "redux/user";
import { requests } from "utils/axios";
import { toast } from "react-toastify";

export default function TableUser() {
  const dispatch = useDispatch();
  const { userList, loading } = useSelector(selectUsers);
  const [loaded, setLoaded] = useState(true);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    dispatch(fetchGetUser());
  }, [dispatch]);

  useEffect(() => {
    const userMap = userList.map((item) => {
      return {
        key: item._id,
        _id: item._id,
        username: item.username,
        email: item.email,
        phone_number: item.phone_number,
        status: item.status,
      };
    });

    setDataUser(userMap);
    loading === "loading" ? setLoaded(true) : setLoaded(false);
  }, [userList]);

  const handleChangeStatus = (status, id) => {
    requests.editUser({ status: status }, id).then((res) => {
      if (res.updatedUser) {
        dispatch(fetchGetUser());
        toast.success(`Changed "${res.updatedUser.username}" status`, {
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
      title: "Status",
      key: "status",
      render: (text, record) => (
        <Switch
          defaultChecked={record.status}
          onChange={(status) => {
            handleChangeStatus(status, record._id);
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} loading={loaded} dataSource={dataUser} />
    </>
  );
}
