import { Button, Form, Input, Modal, Switch } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchCatalogs } from "redux/catalog";
import { requests } from "utils/axios";


const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

export default function ModalAddCategory({ visible, setVisible }) {
    const { userItems } = useSelector((state) => state.userState);
    const dispatch = useDispatch();
    const token = userItems.isAdmin ? userItems.accessToken : null;
    const [form] = Form.useForm();

    const onFinish = (values) => {
        requests.addCatalog(token, values, userItems._id).then((res) => {
            if (res.catalog.status) {
                dispatch(fetchCatalogs());
                form.resetFields();
                setVisible(false);
                toast.success("Add new category succesfully!");
            } else {
                toast.error("Failed");
            }
        });
    };
    const onFinishFailed = (err) => {
        toast.error(`Failed: ${err}`);
    };

    return <>
        <Modal
            title="Add Category"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={false}
            width="50%"
            className="edit-category"
        >
            <Form
                form={form}
                name="validate_other"
                {...formItemLayout}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="catalog_name"
                    label="Category Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input category name!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input/>
                </Form.Item>

                <Form.Item name="status" label="Status" valuePropName="status">
                    <Switch defaultChecked={true}/>
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
                    <Button onClick={() => setVisible(false)}>Cancel</Button>
                </Form.Item>
            </Form>
        </Modal>
    </>

}