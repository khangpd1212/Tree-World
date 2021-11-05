import React from "react";
import { Form, Input, Button,Upload,message,Radio,InputNumber, Select, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
export default function AddProduct() {
  const onFinish = (values) => {
    console.log('Success:', values);
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  const [value, setValue] = React.useState(1);

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const { Option } = Select;
  const selectAfter = (
    <Select defaultValue="USD" style={{ width: 60 }}>
      <Option value="USD">$</Option>
      <Option value="EUR">€</Option>
      <Option value="GBP">£</Option>
      <Option value="CNY">¥</Option>
    </Select>
  );
  const selectBefore = (
    <Select defaultValue="add" style={{ width: 60 }}>
      <Option value="add">+</Option>
      <Option value="minus">-</Option>
    </Select>
  );

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      <Form
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 12,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* name  */}
      <Form.Item
        label="Product Name"
        name="productName"
        rules={[
          {
            required: true,
            message: 'Please input your Product name!',
          },
        ]}
      >
      <Input />
      </Form.Item>

      {/* price  */}
      <Form.Item 
              label="Price"
              name="price"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: 'Please input your Product price!',
                },
              ]}
              >
        <Space direction="vertical">
          <InputNumber addonBefore="+" addonAfter="$" defaultValue={0} />
        </Space>
      </Form.Item>

      {/* description */}
      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input your Product name!',
          },
        ]}
      >
      <Input />
      </Form.Item>

      {/* Inventory */}
      <Form.Item
        label="Inventory"
        name="inventory"
        rules={[
          {
            required: true,
            message: 'Please input your Product Inventory!',
          },
        ]}
      >
      <Input />
      </Form.Item>

      {/* status */}
      <Form.Item
        label="Status"
        name="status"
        valuePropName="checked"
        wrapperCol={{
        }}
        >
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>Hide</Radio>
          <Radio value={2}>Display</Radio>
        </Radio.Group>
      </Form.Item>

        {/* image */}
        <Form.Item
        label="Status"
        name="status"
        valuePropName="checked"
        wrapperCol={{
        }}
        >
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>,
      </Form.Item>


      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  );
}