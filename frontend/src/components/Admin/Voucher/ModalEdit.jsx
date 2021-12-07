import { Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import useConvertISO from "hooks/useConvertISO";
import moment from "moment";
import React, { useCallback } from "react";
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

export default function ModalEdit({
  visible,
  setVisible,
  selected,
  setSelected,
}) {
  const dispatch = useDispatch();

  const dateFormat = "DD/MM/YYYY HH:mm:ss";
  const { convertISO } = useConvertISO();

  const onFinish = (values) => {
    requests.editVoucher(values, selected._id).then((res) => {
      if (res.updatedVoucher) {
        dispatch(fetchGetVoucher());
        setVisible(false);
        toast.success(`Update successfully!`);
      } else {
        toast.error("Failed");
      }
    });
  };

  function disabledDate(current) {
    return current && current < moment().endOf("day");
  }

  const FromEdit = useCallback(() => {
    return (
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          voucherCode: selected.voucherCode,
          percent: selected.percent,
          createDate: moment(convertISO(selected.createDate), dateFormat),
          expiryDate: moment(convertISO(selected.expiryDate), dateFormat),
          maximum: selected.maximum,
          status: selected.status ?? false,
        }}
      >
        <Form.Item
          name="voucherCode"
          label="Voucher Code"
          hasFeedback
          placeholder="Catalog"
          rules={[
            {
              required: true,
              message: "Please input voucher code!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="percent"
          label="Percent (%)"
          hasFeedback
          placeholder="percent"
          rules={[
            {
              required: true,
              message: "Please input percent!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="createDate"
          label="Create Date"
          hasFeedback
          rules={[
            {
              type: "object",
              required: true,
              message: "Please select create date!",
            },
          ]}
        >
          <DatePicker
            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            disabledDate={disabledDate}
            format={dateFormat}
          />
        </Form.Item>
        <Form.Item
          name="expiryDate"
          label="Expiry Date"
          hasFeedback
          rules={[
            {
              type: "object",
              required: true,
              message: "Please select expiry date!",
            },
          ]}
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
          hasFeedback
          placeholder="maximum"
          rules={[
            {
              required: true,
              message: "Please input maximum!",
            },
          ]}
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
          <Button
            onClick={() => {
              setVisible(false);
              setSelected({});
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  }, [selected, setVisible]);

  return (
    <>
      <Modal
        title="Edit Voucher"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={false}
        width="50%"
        className="edit-voucher"
      >
        <FromEdit />
      </Modal>
    </>
  );
}
