import { Switch, Table } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { fetchGetComment, selectComment } from "redux/comment";
import { requests } from "utils/axios";
import { selectUsers } from "redux/user";

export default function TableComment() {
  
  const [loaded, setLoaded] = useState(true);
  const [dataComment, setDataComment] = useState([]);

  const dispatch = useDispatch();
  const { commentList, loading } = useSelector(selectComment);
  const { adminItems } = useSelector(selectUsers);
  const token = adminItems.accessToken;

  useEffect(() => {
    dispatch(fetchGetComment());
  }, [dispatch]);

  useEffect(() => {
    const commentMap = commentList.map((item) => {
      return {
        key: item._id,
        _id: item._id,
        nameUser: item.nameUser,
        star: item.star,
        content: item.content,
        date: item.date,
        status: item.status,
      };
    });

    setDataComment(commentMap);
    loading === "loading" ? setLoaded(true) : setLoaded(false);
  }, [commentList]);

  const handleChangeStatus = async (e, id) => {
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
          defaultChecked={record.status}
          onChange={(e) => {
            handleChangeStatus(e, record._id);
          }}
        />
      ),
    },
  ];



  return (
    <>
      <Table columns={columns} dataSource={dataComment} loading={loaded}/>
    </>
  );
}
