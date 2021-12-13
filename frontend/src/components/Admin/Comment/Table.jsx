import { message, Switch, Table } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchGetComment, selectComment } from "redux/comment";
import { requests } from "utils/axios";
// import ModalEdit from './ModalEdit';

export default function TableComment() {
  const token = JSON.parse(localStorage.getItem("tokenAdmin"));
  const dispatch = useDispatch();

  function confirm(id) {
    requests.deleteProduct(token, id).then((res) => {
      dispatch(fetchGetComment());
      message.success("delete success");
    });
  }

  const handleChangeStatus = (e, id) => {
    requests.editComment({ status: e }, id).then((res) => {
      if (res.status) {
        dispatch(fetchGetComment());
        toast.success("Changed successfully", {
          autoClose: 2000,
        });
      }
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "nameUser",
      key: "nameUser",
      sorter: (a, b) => a.nameUser.localeCompare(b.nameUser),
    },
    {
      title: "Star",
      dataIndex: "star",
      key: "star",
      sorter: (a, b) => a.star - b.star,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <>{moment(date).format("DD/MM/YYYY HH:mm:ss")}</>,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
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

  const { commentList } = useSelector(selectComment);
  console.log(commentList);
  return (
    <>
      <Table columns={columns} dataSource={commentList} />
      {/* <ModalEdit
            visible={visible}
            setVisible={setVisible}
            selected={selected}
            setSelected={setSelected}
        /> */}
    </>
  );
}
