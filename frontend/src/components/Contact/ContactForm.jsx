import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Form } from "antd";
import React from "react";

function ContactForm() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="contact__form--input">
      <Form
        name="basic"
        labelCol={{
          span: 0,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            marginRight: "15px",
          }}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name*"
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
          ]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input
            prefix={
              <PhoneOutlined
                className="site-form-item-icon"
                style={{ transform: "rotate(90deg)" }}
              />
            }
            placeholder="Phone*"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="E-mail*"
          />
        </Form.Item>
        <Form.Item
          name="messenger"
          rules={[
            {
              required: true,
              message: "Please input your message!",
            },
          ]}
        >
          <Input.TextArea rows={6} placeholder="Messenger*" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Button type="primary" htmlType="submit">
            Send Messenger
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ContactForm;
