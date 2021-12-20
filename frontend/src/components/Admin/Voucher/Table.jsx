import { Button, Space, Switch, Table } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchGetVoucher, selectVouchers } from "redux/voucher";
import { requests } from "utils/axios";
import ModalEdit from "./ModalEdit";

export default function TableVoucher() {
  const { voucherList, loading } = useSelector(selectVouchers);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const [loaded, setLoaded] = useState(true);
  const [dataVoucher, setDataVoucher] = useState([]);
  const dispatch = useDispatch();

  const onEdit = (data) => {
    setSelected(data);
    setVisible(true);
  };
  
  useEffect(() => {
    dispatch(fetchGetVoucher());
  }, [dispatch]);

  useEffect(() => {
    const voucherMap = voucherList.map((item) => {
      return {
        key: item._id,
        _id: item._id,
        voucherCode: item.voucherCode,
        percent: item.percent,
        createDate: item.createDate,
        expiryDate: item.expiryDate,
        maximum: item.maximum,
        status: item.status,
      };
    });

    setDataVoucher(voucherMap);
    loading === "loading" ? setLoaded(true) : setLoaded(false);
  }, [voucherList]);

  const handleChangeStatus = (e, id) => {
    requests.editVoucher({ status: e }, id).then((res) => {
      if (res.updatedVoucher) {
        dispatch(fetchGetVoucher());
        toast.success(`Changed "${res.updatedVoucher.voucherCode}" status`, {
          autoClose: 2000,
        });
      }
    });
  };
  const columns = [
    {
      title: "Voucher Code",
      dataIndex: "voucherCode",
      key: "voucherCode",
      sorter: (a, b) => a.voucherCode.localeCompare(b.voucherCode),
    },
    {
      title: "Percent (%)",
      dataIndex: "percent",
      key: "percent",
      sorter: (a, b) => a.percent - b.percent,
    },
    {
      title: "Created_Date",
      dataIndex: "createDate",
      key: "createDate",
      render: (createDate) => (
        <>{moment(createDate).format("DD/MM/YYYY HH:mm:ss")}</>
      ),
      sorter: (a, b) => new Date(a.createDate) - new Date(b.createDate),
    },
    {
      title: "Expiry_Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (expiryDate) => (
        <>{moment(expiryDate).format("DD/MM/YYYY HH:mm:ss")}</>
      ),
      sorter: (a, b) => new Date(a.expiryDate) - new Date(b.expiryDate),
    },
    {
      title: "Maximum ($)",
      dataIndex: "maximum",
      key: "maximum",
      sorter: (a, b) => a.maximum - b.maximum,
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
      <Table columns={columns} dataSource={dataVoucher} loading={loaded} />
      <ModalEdit
        visible={visible}
        setVisible={setVisible}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}
