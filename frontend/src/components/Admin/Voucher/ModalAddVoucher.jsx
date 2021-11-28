import { Button, Form, Input, Modal, Switch } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchGetVoucher } from 'redux/voucher';
import { requests } from "utils/axios";


const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

export default function ModalAddCVoucher({ visible, setVisible }) {
    const { userItems } = useSelector((state) => state.userState);
    const dispatch = useDispatch();
    const token = userItems.isAdmin ? userItems.accessToken : null;
    const [form] = Form.useForm();

    const onFinish = (values) => {
        requests.addVoucher(token, values, userItems._id).then((res) => {
            if (res.voucher.status) {
                dispatch(fetchGetVoucher());
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
            title="Add Voucher"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={false}
            width="50%"
            className="edit-voucher"
        >
            <Form
                form={form}
                name="validate_other"
                {...formItemLayout}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="voucherCode"
                    label="Voucher Code:"
                    rules={[
                        {
                            required: true,
                            message: "Please input voucher code!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="percent"
                    label="Percent (%):"
                    rules={[
                        {
                            required: true,
                            message: "Please input percent!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="createDate"
                    label="Create Date:"
                    rules={[
                        {
                            required: true,
                            message: "Please input created date!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="expiryDate"
                    label="Expiry Date:"
                    rules={[
                        {
                            required: true,
                            message: "Please input expiry date!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="maximum"
                    label="Maximum:"
                    rules={[
                        {
                            required: true,
                            message: "Please input maximum!",
                        },
                    ]}
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
                    <Button onClick={() => setVisible(false)}>Cancel</Button>
                </Form.Item>
            </Form>
        </Modal>
    </>

}