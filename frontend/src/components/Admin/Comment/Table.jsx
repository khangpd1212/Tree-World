import {message, Space, Table,Image, Switch } from 'antd';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetComment, selectComment } from 'redux/comment';
import { requests } from 'utils/axios';
// import ModalEdit from './ModalEdit';



export default function TableComment() {
    const token = JSON.parse(localStorage.getItem("tokenAdmin"));
    const dispatch = useDispatch()

    function confirm(id) {
        requests.deleteProduct(token, id)
            .then(res => {
                dispatch(fetchGetComment())
                message.success('delete success')
            })
    }

    const columns = [
        {
            title: 'Image URL',
            dataIndex: 'imageProduct',
            key: 'imageProduct',
            render: (value, record) => (
                <Space size="middle">
                    <Image
                        width={100}
                        src={value}
                    />
                </Space>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'nameUser',
            key: 'nameUser',
        },
        {
            title: 'Star',
            dataIndex: 'star',
            key: 'star',
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Status',
            key: 'status',
            render: (text, record) => (
                <Switch defaultChecked={true} />
            )

        },
    ];

    const { commentList } = useSelector(selectComment)
    console.log(commentList);
    return <>
        <Table columns={columns} dataSource={commentList} />
        {/* <ModalEdit
            visible={visible}
            setVisible={setVisible}
            selected={selected}
            setSelected={setSelected}
        /> */}
    </>
}