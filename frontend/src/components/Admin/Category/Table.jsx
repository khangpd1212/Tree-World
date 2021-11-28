import { Button, Space, Switch, Table } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalogs, selectCatalogs } from 'redux/catalog';
import ModalEdit from './ModalEditCategory';

export default function TableCategory() {

    const { catalogList } = useSelector(selectCatalogs)
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCatalogs());
    }, [dispatch])
    console.log(catalogList)
    const onEdit = (data) => {
        setSelected(data)
        setVisible(true)
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'catalog_name',
            key: 'catalog_name',
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
        <Table columns={columns} dataSource={catalogList} />
        <ModalEdit
            visible={visible}
            setVisible={setVisible}
            selected={selected}
            setSelected={setSelected}
        />
    </>
}