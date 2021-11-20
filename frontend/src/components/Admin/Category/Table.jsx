import { Button, message, Popconfirm, Space, Table, Switch } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchCatalogs, selectCatalogs } from 'redux/catalog';
import { requests } from 'utils/axios';
// import ModalEdit from './ModalEdit';



export default function TableCategory() {
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState({})
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
    function confirm(id) {
        requests.deleteProduct(token, id)
            .then(res => {
                console.log(res);
                dispatch(fetchCatalogs())
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
            dataIndex: 'catalog_name',
            key: 'catalog_name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Status',
            key: 'status',
            render: (text, record)=> (
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

    const { catalogList } = useSelector(selectCatalogs)
    console.log(catalogList)
    return <>
        <Table columns={columns} dataSource={catalogList} />
        {/* <ModalEdit
            visible={visible}
            setVisible={setVisible}
            selected={selected}
            setSelected={setSelected}
        /> */}
    </>
}