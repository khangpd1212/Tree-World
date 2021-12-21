import { Button, Image, Space, Switch, Table } from "antd";
import ModalAddBlog from "components/Admin/News/ModalAddBlog";
import ModalEditBlog from "components/Admin/News/ModalEditBlog";
import BtnAdd from "components/BtnAdd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchBlogs, selectBlogs } from "redux/blog";
import { selectUsers } from "redux/user";
import { requests } from "utils/axios";

export default function News() {
  const { Column } = Table;
  const dispatch = useDispatch();
  const { blogList, loading } = useSelector(selectBlogs);
  const { adminItems } = useSelector(selectUsers);
  const token = adminItems.accessToken;

  const [openAddBlog, setOpenAddBlog] = useState(false);
  const [selected, setSelected] = useState({});
  const [visible, setVisible] = useState(false);
  const [dataBlog, setDataBlog] = useState([]);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    const blogMap = blogList.map((item) => {
      return {
        key: item._id,
        _id: item._id,
        image: item.image,
        title: item.title,
        create_date: item.create_date,
        content: item.content,
        status: item.status,
      };
    });

    setDataBlog(blogMap);
    loading === "loading" ? setLoaded(true) : setLoaded(false);
  }, [blogList]);
  
  const handleChangeStatus = (e, id) => {
    requests.editBlog(token, { status: e }, id).then((res) => {
      if (res.status) {
        dispatch(fetchBlogs());
        toast.success(`Changed "${res.updatedBlog.title}" status`, {
          autoClose: 2000,
        });
      }
    });
  };

  const onEdit = (data) => {
    setSelected(data);
    setVisible(true);
  };
  return (
    <>
      <BtnAdd page="new" setOpen={setOpenAddBlog} />
      <Table dataSource={dataBlog} loading={loaded}>
        <Column
          title="Image"
          dataIndex="image"
          key="image"
          render={(text, record) => <Image src={record.image} width="150px" />}
        />

        <Column
          title="Title"
          dataIndex="title"
          key="title"
          sorter={(a, b) => a.title.localeCompare(b.title)}
        />
        <Column
          title="Date"
          dataIndex="create_date"
          key="create_date"
          render={(create_date) => (
            <>{moment(create_date).format("DD/MM/YYYY HH:mm:ss")}</>
          )}
          sorter={(a, b) => new Date(a.create_date) - new Date(b.create_date)}
        />
        <Column title="Content" dataIndex="content" key="content" />
        <Column
          title="Status"
          key="status"
          render={(text, record) => (
            <Switch
              defaultChecked={record.status}
              onChange={(e) => {
                handleChangeStatus(e, record._id);
              }}
            />
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button type="primary" onClick={() => onEdit(record)}>
                Edit
              </Button>
            </Space>
          )}
        />
      </Table>
      <ModalAddBlog visible={openAddBlog} setVisible={setOpenAddBlog} />
      <ModalEditBlog
        visible={visible}
        setVisible={setVisible}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}
