import { Button, message, Popconfirm, Space, Table, Switch } from 'antd';
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
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone_Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Status',
            key: 'status',
            render: (text, record) => (
                <Switch defaultChecked={true} />
            )

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