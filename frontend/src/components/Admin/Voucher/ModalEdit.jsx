import { Button, Form, Modal, Select, Switch, Input } from 'antd';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { useDispatch } from "react-redux";
import { useSelector, useEffect } from 'react-redux';
import { toast } from "react-toastify";
import { fetchGetVoucher, selectVouchers } from 'redux/voucher';
import { requests } from 'utils/axios';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function ModalEdit({ visible, setVisible, selected, setSelected }) {
  const { voucherList } = useSelector(selectVouchers);

  const dispatch = useDispatch()
  const token = JSON.parse(localStorage.getItem("tokenAdmin"));
  console.log(selected)
  const onFinish = (values) => {
    requests
      .editVoucher(token, values, selected._id)
      .then((res) => {
        console.log(res);
        if (res.updatedVoucher.status) {
          dispatch(fetchGetVoucher());
          setVisible(false);
          toast.success(`Update successfully!`);
        } else {
          toast.error("Failed");
        }
      });
  };


  const FromEdit = useCallback(() => {
    return <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        'voucherCode': selected.voucherCode,
        'percent': selected.percent,
        'createDate': selected.createDate,
        'expiryDate': selected.expiryDate,
        'maximum': selected.maximum,
        'status': selected.status ?? false,
      }}
    >
      <Form.Item
        name="voucherCode"
        label="Voucher Code"
        hasFeedback
        placeholder="Catalog"
      >
        <Input defaultValue={selected.voucherCode} />
      </Form.Item>
      <Form.Item
        name="percent"
        label="Percent (%)"
        hasFeedback
        placeholder="percent"
      >
        <Input defaultValue={selected.percent} />
      </Form.Item>
      <Form.Item
        name="createDate"
        label="Create Date"
        hasFeedback
        placeholder="createDate"
      >
        <Input defaultValue={selected.createDate} />
      </Form.Item>
      <Form.Item
        name="expiryDate"
        label="Expiry Date"
        hasFeedback
        placeholder="expiryDate"
      >
        <Input defaultValue={selected.expiryDate} />
      </Form.Item>
      <Form.Item
        name="maximum"
        label="Maximum"
        hasFeedback
        placeholder="maximum"
      >
        <Input defaultValue={selected.maximum} />
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
        <Button onClick={() => setVisible(false)}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  }, [selected, setVisible])

  return <>
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

}