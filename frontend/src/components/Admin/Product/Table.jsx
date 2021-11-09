import { Button, Image, message, Popconfirm, Space, Table } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchProducts, selectProducts } from 'redux/product';
import { requests } from 'utils/axios';
import ModalAddProduct from './ModalAddProduct';
import ModalEdit from './ModalEdit';



export default function TableProducts() {
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState({})
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
    function confirm(id) {
        requests.deleteProduct(token, id)
            .then(res=> {
                console.log(res);
                dispatch(fetchProducts())
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

    const {productList} = useSelector(selectProducts)
    
    return <>
        <Table columns={columns} dataSource={productList} />
        <ModalEdit
            visible={visible}
            setVisible={setVisible}
            selected={selected}
            setSelected={setSelected}
        />
    </>
}