import { Button, Form, Input, Modal } from "antd";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchCatalogs } from "redux/catalog";
import { requests } from "utils/axios";
import { validations } from "utils/validation";

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
}) {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    if (!validations.checkBlankSpace(values.catalog_name)) {
      toast.error("You are not allowed text only white space");
    } else {
      requests.editCatalog(values, selected._id).then((res) => {
        if (res.updatedCatalog) {
          dispatch(fetchCatalogs());
          setVisible(false);
          toast.success(`Update successfully!`);
        } else {
          toast.error("Failed");
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
              message: "Please input category name!",
            },
          ]}
        >
          <Input defaultValue={selected.catalog_name} />
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
