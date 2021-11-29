import { Button, Space, Table, Switch } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetVoucher, selectVouchers } from 'redux/voucher';
import ModalEdit from './ModalEdit';



export default function TableVoucher() {
    const { voucherList } = useSelector(selectVouchers)
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchGetVoucher());
    }, [dispatch])
    console.log(voucherList)

    const onEdit = (data) => {
        setSelected(data)
        setVisible(true)
    }
    const columns = [
        {
            title: 'Voucher Code',
            dataIndex: 'voucherCode',
            key: 'voucherCode',
        },
        {
            title: 'Percent (%)',
            dataIndex: 'percent',
            key: 'percent',
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
                </Space>
            ),
        },
    ];

    return <>
        <Table columns={columns} dataSource={voucherList} />
        <ModalEdit
            visible={visible}
            setVisible={setVisible}
            selected={selected}
            setSelected={setSelected}
        />
    </>
}