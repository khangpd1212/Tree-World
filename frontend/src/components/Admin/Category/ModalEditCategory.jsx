import { Button, Form, Modal, Select, Switch } from 'antd';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { useDispatch } from "react-redux";
import { useSelector, useEffect } from 'react-redux';
import { toast } from "react-toastify";
import { selectCatalogs } from 'redux/catalog';
import { fetchProducts } from "redux/product";
import { requests } from 'utils/axios';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

export default function ModalEdit({ visible, setVisible, selected, setSelected }) {
    const { catalogList } = useSelector(selectCatalogs);
    const [imgBase64, setImgBase64] = useState("")
    let catalogSeleted = catalogList && selected && catalogList.find(f => f._id === selected.catalog_id);
    const dispatch = useDispatch()
    const token = localStorage.getItem("token");

    const onFinish = (values) => {
        requests.editProduct(
            token, values, selected._id,imgBase64
        ).then(res=> {
            dispatch(fetchProducts())
            setVisible(false)
            toast.success("Update product success")
        }).catch(err=> toast.warning(err))

    };


    const FromEdit = useCallback(() => {

        return <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{
                'catalog_id': selected.catalog_id,
                'status': selected.status ?? false,
            }}
        >
            <Form.Item
                name="catalog_id"
                label="Catalog"
                hasFeedback
                placeholder="Catalog"
            >
                <Select placeholder={catalogSeleted?.catalog_name} defaultValue={selected.catalog_id}>
                    {
                        catalogList && catalogList.filter(f => f.status).map(cata => <Option value={cata._id}>{cata.catalog_name}</Option>)
                    }
                </Select>
            </Form.Item>

            <Form.Item name="status" label="Status" valuePropName="status">
                <Switch defaultChecked={selected.status} />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    span: 12,
                    offset: 6,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button onClick={() => setVisible(false)}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    }, [selected, imgBase64])

    return <>
        <Modal
            title="Edit Category"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={false}
            width="50%"
            className="edit-category"
        >
            <FromEdit />
        </Modal>
    </>

}