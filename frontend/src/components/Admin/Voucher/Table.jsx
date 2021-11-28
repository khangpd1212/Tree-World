import { Button, message, Popconfirm, Space, Table, Switch } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetVoucher, selectVouchers } from 'redux/voucher';
import { requests } from 'utils/axios';
// import ModalEdit from './ModalEdit';



export default function TableVoucher() {
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState({})
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
    function confirm(id) {
        requests.deleteProduct(token, id)
            .then(res => {
                dispatch(fetchGetVoucher())
                message.success('delete success')
            })
    }

    const onEdit = (data) => {
        setSelected(data)
        setVisible(true)
    }
    const columns = [
        {
            title: 'Percent',
            dataIndex: 'percent',
            key: 'percent',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Created_Date',
            dataIndex: 'createDate',
            key: 'createDate',
        },
        {
            title: 'Expiry_Date',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
        },
        {
            title: 'Maximum',
            dataIndex: 'maximum',
            key: 'maximum',
        },
        {
            title: 'Status',
            key: 'status',
            render: (text, record) => (
                <Switch defaultChecked={true} />
            )

        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={() => onEdit(record)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        placement="rightTop"
                        title={"Do you want delete this ?"}
                        onConfirm={() => confirm(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const { voucherList } = useSelector(selectVouchers)
    console.log(voucherList);
    return <>
        <Table columns={columns} dataSource={voucherList} />
        {/* <ModalEdit
            visible={visible}
            setVisible={setVisible}
            selected={selected}
            setSelected={setSelected}
        /> */}
    </>
}