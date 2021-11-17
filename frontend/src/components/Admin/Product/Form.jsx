
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, InputNumber, Rate, Select, Switch, Upload } from 'antd';
import React from 'react';
import { useEffect } from 'react';
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
export default function FormEdit({ selected, catalogSeleted, catalogs }) {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return useEffect(() => {
        return <Form
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
                <Input placeholder={selected.product_name} defaultValue={selected.product_name} />
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
                <Select placeholder={catalogSeleted?.catalog_name}>
                    {
                        catalogs && catalogs.filter(f => f.status).map(cata => <Option value={cata._id}>{cata.catalog_name}</Option>)
                    }
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

            <Form.Item name="isHot" label="isHot" valuePropName="isHot">
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
                <Image src={selected.image} width="120px" /> <br />
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
    }, [])
}
