import { Space, Table, Switch, Button } from "antd";
import ModalAddBlog from "components/Admin/News/ModalAddBlog";
import ModalEditBlog from "components/Admin/News/ModalEditBlog";
import BtnAdd from "components/BtnAdd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchBlogs, selectBlogs } from "redux/blog";
import { requests } from "utils/axios";
export default function News() {
  const { Column } = Table;
  const dispatch = useDispatch();
  const { blogList } = useSelector(selectBlogs);
  const { userItems } = useSelector((state) => state.userState);
  const token = userItems.accessToken;
  const [openAddBlog, setOpenAddBlog] = useState(false);
  const [selected, setSelected] = useState({});
  const [visible, setVisible] = useState(false);
  const handleChangeStatus = (e, id) => {
    requests.editBlog(token, { status: e }, id).then((res) => {
      console.log(res);
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
      <Table dataSource={blogList}>
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Date" dataIndex="create_date" key="create_date" />
        <Column title="Content" dataIndex="content" key="content" />
        <Column
          title="Status"
          key="status"
          render={(text, record) => (
            <Switch
              defaultChecked={text.status}
              onChange={(e) => {
                handleChangeStatus(e, text._id);
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
