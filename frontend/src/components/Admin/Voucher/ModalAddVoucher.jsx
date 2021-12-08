import { Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchGetVoucher } from "redux/voucher";
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
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const dateFormat = "DD/MM/YYYY HH:mm:ss";

  const onFinish = (values) => {
    requests.addVoucher(values).then((res) => {
      if (res.voucher.status) {
        dispatch(fetchGetVoucher());
        form.resetFields();
        setVisible(false);
        toast.success("Add new voucher succesfully!");
      } else {
        toast.error("Failed");
      }
    });
  };
  const onFinishFailed = (err) => {
    toast.error(`Failed: ${err}`);
  };

 function disabledDate(current) {
   return current && current < moment().endOf("day");
 }
  return (
    <>
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
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="createDate"
            label="Create Date:"
            rules={[
              {
                type: "object",
                required: true,
                message: "Please input created date!",
              },
            ]}
            hasFeedback
          >
            <DatePicker
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
              disabledDate={disabledDate}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item
            name="expiryDate"
            label="Expiry Date:"
            rules={[
              {
                type: "object",
                required: true,
                message: "Please input expiry date!",
              },
            ]}
            hasFeedback
          >
            <DatePicker
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
              disabledDate={disabledDate}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item
            name="maximum"
            label="Maximum"
            rules={[
              {
                required: true,
                message: "Please input maximum!",
              },
            ]}
            hasFeedback
          >
            <InputNumber />
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
  );
}
