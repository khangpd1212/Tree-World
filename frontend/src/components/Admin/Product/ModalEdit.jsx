
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Rate, Select, Switch, Upload, InputNumber } from 'antd';
import React from 'react';
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};

export default function ModalEdit({ visible, setVisible, selected, setSelected }) {
    console.log(selected);
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return <>
        <Modal
            title="Edit Products"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width="100%"
            className="edit-product"
        >
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={onFinish}
                initialValues={{
                    'input-number': 3,
                    'checkbox-group': ['A', 'B'],
                    rate: 3.5,
                }}
            >
                <Form.Item
                    name="price"
                    label="Name"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please input the name product!',
                        },
                    ]}
                >
                    <Input placeholder="price" type="number" />
                </Form.Item>
                <Form.Item
                    name="catalog_id"
                    label="Catalog"
                    hasFeedback
                    placeholder="Catalog"
                    rules={[
                        {
                            required: true,
                            message: 'Please select Catalog!',
                        },
                    ]}
                >
                    <Select placeholder="Catalog">
                        <Option value="china">China</Option>
                        <Option value="usa">U.S.A</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="inventory" label="Iventory" valuePropName="isHot">
                    <Form.Item name="input-number" noStyle>
                        <InputNumber min={1} max={10} />
                    </Form.Item>
                    <span className="ant-form-text"> Price</span>
                    <Form.Item name="input-number" noStyle>
                        <InputNumber min={1} max={10} />
                    </Form.Item>
                </Form.Item>

                <Form.Item name="switch" label="isHot" valuePropName="isHot">
                    <Switch />
                </Form.Item>

                <Form.Item name="status" label="Status" valuePropName="status">
                    <Switch />
                </Form.Item>

                <Form.Item name="star" label="Star">
                    <Rate />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="description">
                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Input.TextArea />
                    </Form.Item>
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
                </Form.Item>
            </Form>
        </Modal>
    </>

}