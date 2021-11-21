import { Button, message, Popconfirm, Space, Table } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getOrders, selectOrders } from 'redux/order';
import { requests } from 'utils/axios';
// import ModalEdit from './ModalEdit';



export default function TableOrder() {
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState({})
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])
    function confirm(id) {
        requests.deleteProduct(token, id)
            .then(res => {
                dispatch(getOrders())
                message.success('delete success')
            })
    }

    const onEdit = (data) => {
        setSelected(data)
        setVisible(true)
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone_Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Total',
            dataIndex: 'toTal',
            key: 'toTal',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
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

    const { orderList } = useSelector(selectOrders)
    console.log(orderList)
    return <>
        <Table columns={columns} dataSource={orderList} />
        {/* <ModalEdit
            visible={visible}
            setVisible={setVisible}
            selected={selected}
            setSelected={setSelected}
        /> */}
    </>
}