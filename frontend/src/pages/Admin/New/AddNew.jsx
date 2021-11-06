import { Form, Input, Button, Radio,Upload,message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from "react";
export default function AddNew(){
    const onFinish = (values) => {
        console.log('Success:', values);
        };
        const [value, setValue] = React.useState(1);
    
        const onChange = e => {
          console.log('radio checked', e.target.value);
          setValue(e.target.value);
        };
        const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        };
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
    return(
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
                {/* name news  */}
                <Form.Item
                    label="Name News"
                    name="nameNews"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Name News!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* detail new  */}
                <Form.Item
                    label="Conten"
                    name="conten"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Conten!',
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
                    label="Image"
                    name="image"
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
    )
}