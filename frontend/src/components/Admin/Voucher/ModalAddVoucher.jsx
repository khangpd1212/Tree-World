import { Button, Form, Input, Modal, Switch } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCatalogs } from 'redux/catalog';
import { fetchProducts } from "redux/product";
import { requests } from "utils/axios";


const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

export default function ModalAddVoucher({ visible, setVisible }) {
    const { catalogList } = useSelector(selectCatalogs);
    const [imgBase64, setImgBase64] = useState("")
    const dispatch = useDispatch()
    const token = localStorage.getItem("token");

    const onFinish = (values) => {
        requests.addProduct(token, values, imgBase64)
            .then(res => {
                console.log(res);
                dispatch(fetchProducts())
                setVisible(false)
                toast.success("Add new product succesfully!")
            })
    };



    const FromEdit = useCallback(() => {

        return <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
        >
            <Form.Item
                name="percent"
                label="Percent (%)"
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="createdDate"
                label="Created Date"
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="expiryDate"
                label="Expiry Date"
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="maximum"
                label="Maximum"
                hasFeedback
            >
                <Input />
            </Form.Item>
            <Form.Item name="status" label="Status" valuePropName="status">
                <Switch defaultChecked={true} />
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
    }, [catalogList, imgBase64])

    return <>
        <Modal
            title="Add Voucher"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={false}
            width="50%"
            className="edit-product"
        >
            <FromEdit />
        </Modal>
    </>

}