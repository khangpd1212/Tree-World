import { Button, Form, Input, Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchCatalogs } from "redux/catalog";
import { requests } from "utils/axios";
import { selectUsers } from "redux/user";
import { validations } from "utils/validation";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function ModalAddCategory({ visible, setVisible }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { adminItems } = useSelector(selectUsers);
  const token = adminItems.accessToken;

  const onFinish = (values) => {
    if (!validations.checkBlankSpace(values.catalog_name)) {
      toast.error("You are not allowed text only white space");
    } else {
      requests.addCatalog(token, values).then((res) => {
        if (res.catalog) {
          dispatch(fetchCatalogs());
          form.resetFields();
          setVisible(false);
          toast.success("Add new category succesfully!");
        } else {
          toast.error("Failed");
        }
      });
    }
  };
  const onFinishFailed = (err) => {
    toast.error(`Failed: ${err}`);
  };

  return (
    <>
      <Modal
        title="Add Category"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={false}
        width="50%"
        className="edit-category"
      >
        <Form
          form={form}
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="catalog_name"
            label="Category Name"
            rules={[
              {
                required: true,
                message: "Please input category name!",
              },
            ]}
            hasFeedback
          >
            <Input />
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
