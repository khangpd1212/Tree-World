import { Form, Input, Button, Radio } from 'antd';
import React from "react";

export default function AddCategory(){
    const onFinish = (values) => {
    console.log('Success:', values);
    };
    const [value, setValue] = React.useState(1);

    const onChange = e => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };
    // const onFinish = (values) => {
    // console.log('Success:', values);
    // }
    // const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
    // }
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
                {/* name catagory  */}
                <Form.Item
                    label="Catalog Name"
                    name="catalogName"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Catalog Name!',
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