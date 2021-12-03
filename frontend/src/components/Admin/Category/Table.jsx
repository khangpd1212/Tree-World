import { Button, Space, Switch, Table } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchCatalogs, selectCatalogs } from "redux/catalog";
import { requests } from "utils/axios";
import ModalEdit from "./ModalEditCategory";

export default function TableCategory() {
  const { catalogList } = useSelector(selectCatalogs);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const dispatch = useDispatch();
  const { userItems } = useSelector((state) => state.userState);
  const token = userItems.accessToken;
  useEffect(() => {
    dispatch(fetchCatalogs());
  }, [dispatch]);
  console.log(catalogList);
  const onEdit = (data) => {
    setSelected(data);
    setVisible(true);
  };
  const handleChangeStatus = (e, id) => {
    requests.editCatalog(token, { status: e }, id).then((res) => {
      console.log(res);

      dispatch(fetchCatalogs());
      toast.success(`Changed status`, {
        autoClose: 2000,
      });
    });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "catalog_name",
      key: "catalog_name",
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
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onEdit(record)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={catalogList} />
      <ModalEdit
        visible={visible}
        setVisible={setVisible}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}
