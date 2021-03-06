import { Button, Space, Switch, Table } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchCatalogs, selectCatalogs } from "redux/catalog";
import { requests } from "utils/axios";
import ModalEdit from "./ModalEditCategory";
import { selectUsers } from "redux/user";

export default function TableCategory() {
  const { catalogList, loading } = useSelector(selectCatalogs);
  const { adminItems } = useSelector(selectUsers);
  const token = adminItems.accessToken;

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const [loaded, setLoaded] = useState(true);
  const [dataCatalog, setDataCatalog] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalogs());
  }, [dispatch]);

  useEffect(() => {
    const catalogMap = catalogList.map((item) => {
      return {
        key: item._id,
        _id: item._id,
        catalog_name: item.catalog_name,
        status: item.status,
      };
    });

    setDataCatalog(catalogMap);
    loading === "loading" ? setLoaded(true) : setLoaded(false);
  }, [catalogList]);

  const onEdit = (data) => {
    setSelected(data);
    setVisible(true);
  };

  const handleChangeStatus = (e, id) => {
    requests.editCatalog(token, { status: e }, id).then((res) => {
      if (res) {
        dispatch(fetchCatalogs());
        toast.success(`Changed status`, {
          autoClose: 2000,
        });
      }
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "catalog_name",
      key: "catalog_name",
      sorter: (a, b) => a.catalog_name.localeCompare(b.catalog_name),
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
      <Table columns={columns} dataSource={dataCatalog} loading={loaded} />
      <ModalEdit
        visible={visible}
        setVisible={setVisible}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}
