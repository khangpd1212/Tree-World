import { Button, message, Popconfirm, Space, Table,Image, Switch } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetComment, selectComment } from 'redux/comment';
import { requests } from 'utils/axios';
// import ModalEdit from './ModalEdit';



export default function TableComment() {
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState({})
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchGetComment())
    }, [dispatch])
    function confirm(id) {
        requests.deleteProduct(token, id)
            .then(res => {
                dispatch(fetchGetComment())
                message.success('delete success')
            })
    }

    const onEdit = (data) => {
        setSelected(data)
        setVisible(true)
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
            render: text => <a>{text}</a>,
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