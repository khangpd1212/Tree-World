import { message, Space, Table, Switch } from "antd";
// import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchGetComment, selectComment } from "redux/comment";
import { requests } from "utils/axios";
import { toast } from "react-toastify";
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
    requests.editComment(token, { status: e }, id).then((res) => {
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
    },
    {
      title: "Star",
      dataIndex: "star",
      key: "star",
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
