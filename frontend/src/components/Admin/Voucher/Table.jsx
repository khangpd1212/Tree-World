import { Button, Space, Switch, Table } from "antd";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchGetVoucher, selectVouchers } from "redux/voucher";
import { requests } from "utils/axios";
import ModalEdit from "./ModalEdit";

export default function TableVoucher() {
  const { voucherList } = useSelector(selectVouchers);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const dispatch = useDispatch();

  const onEdit = (data) => {
    setSelected(data);
    setVisible(true);
  };

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
    },
    {
      title: "Percent (%)",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "Created_Date",
      dataIndex: "createDate",
      key: "createDate",
      render: (createDate) => (
        <>{moment(createDate).format("DD/MM/YYYY HH:mm:ss")}</>
      ),
    },
    {
      title: "Expiry_Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (expiryDate) => (
        <>{moment(expiryDate).format("DD/MM/YYYY HH:mm:ss")}</>
      ),
    },
    {
      title: "Maximum ($)",
      dataIndex: "maximum",
      key: "maximum",
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
      <Table columns={columns} dataSource={voucherList} />
      <ModalEdit
        visible={visible}
        setVisible={setVisible}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}
