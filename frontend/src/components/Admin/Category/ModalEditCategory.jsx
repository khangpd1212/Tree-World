import { Button, Form, Input, Modal } from 'antd';
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { fetchCatalogs } from 'redux/catalog';
import { requests } from 'utils/axios';
import { validations } from 'utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from 'redux/user';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function ModalEdit({ visible, setVisible, selected }) {
  const dispatch = useDispatch();
  const { adminItems } = useSelector(selectUsers);
  const token = adminItems.accessToken;

  const onFinish = (values) => {
    if (!validations.checkBlankSpace(values.catalog_name)) {
      toast.error('You are not allowed text only white space');
    } else {
      requests.editCatalog(token, values, selected._id).then((res) => {
        if (res && res.updatedCatalog) {
          dispatch(fetchCatalogs());
          setVisible(false);
          toast.success(`Update successfully!`);
          // } else {
          //   toast.error('Failed');
        }
      });
    }
  };

  const FromEdit = useCallback(() => {
    return (
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          catalog_name: selected.catalog_name,
          status: selected.status ?? false,
          slug: selected.slug,
        }}
      >
        <Form.Item
          name="catalog_name"
          label="Catalog"
          hasFeedback
          placeholder="Catalog"
          rules={[
            {
              required: true,
              message: 'Please input category name!',
            },
          ]}
        >
          <Input defaultValue={selected.catalog_name} />
        </Form.Item>
        <Form.Item
          name="slug"
          label="SEO"
          rules={[
            {
              required: true,
              message: 'Please enter input',
            },
          ]}
          hasFeedback
        >
          <Input defaultValue={selected.slug} />
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
    );
  }, [selected, setVisible]);

  return (
    <>
      <Modal
        title="Edit Category"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={false}
        width="50%"
        className="edit-category"
      >
        <FromEdit />
      </Modal>
    </>
  );
}
