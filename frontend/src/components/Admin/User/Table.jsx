import { Button, message, Popconfirm, Space, Table } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUser, selectUsers } from 'redux/user';
import { requests } from 'utils/axios';
// import ModalEdit from './ModalEdit';



export default function TableUser() {
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState({})
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
    function confirm(id) {
        requests.deleteProduct(token, id)
            .then(res => {
                dispatch(fetchGetUser())
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
            render: text => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'Phone_Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
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

    const { userList } = useSelector(selectUsers)
    console.log(userList);
    return <>
        <Table columns={columns} dataSource={userList} />
        {/* <ModalEdit
            visible={visible}
            setVisible={setVisible}
            selected={selected}
            setSelected={setSelected}
        /> */}
    </>
}