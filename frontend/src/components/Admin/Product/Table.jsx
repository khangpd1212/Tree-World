import { Button, Image, message, Popconfirm, Space, Table } from 'antd';
import { useState } from 'react';
import { useDataProducts } from 'redux/products/hook';
import ModalEdit from './ModalEdit';



export default function TableProducts() {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState({})

    function confirm() {
        message.success('delete success');
    }

    const onEdit = (data) => {
        setSelected(data)
        setVisible(true)
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'product_name',
            key: 'product_name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
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
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const data = useDataProducts()

    return <>
        <Table columns={columns} dataSource={data} />
        <ModalEdit
            visible={visible}
            setVisible={setVisible}
            selected={selected}
            setSelected={setSelected}
        />
    </>
}