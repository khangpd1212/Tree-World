import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Switch, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchBlogs } from "redux/blog";
import { selectUsers } from "redux/user";
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

const normFile = (e) => {
  console.log(`lits`, e.fileLis);
  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default function ModalAddBlog({ visible, setVisible }) {
  const { adminItems } = useSelector(selectUsers);
  const token = adminItems.accessToken;

  const [imgBase64, setImgBase64] = useState("");
  const dispatch = useDispatch();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [blog, setBlog] = useState({
    title: null,
    content: null,
    status: true,
  });
  const onFinish = (values) => {
    if (
      !validations.checkBlankSpace(values.title) ||
      !validations.checkBlankSpace(values.content)
    ) {
      toast.error("You are not allowed text only white space");
    } else {
      requests.addBlog(token, blog, imgBase64, adminItems._id).then((res) => {
        console.log(res);
        if (res.status) {
          dispatch(fetchBlogs());
          form.resetFields();
          setFileList([]);
          setVisible(false);
          toast.success("Add new blog succesfully!");
        } else {
          toast.error("Failed");
        }
      });
    }
  };
  const onFinishFailed = (err) => {
    toast.error(`Failed: ${err}`);
  };

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file) => {
    setPreviewVisible(true);

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = async (info) => {
    setFileList(info.fileList);
    const hash = await getBase64(info.file.originFileObj);
    setImgBase64(hash);
  };
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title="Add Blog"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={false}
        width="50%"
        className="edit-product"
      >
        <Form
          form={form}
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input title!",
              },
            ]}
            hasFeedback
          >
            <Input
              onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                required: true,
                message: "Please input content!",
              },
            ]}
            hasFeedback
          >
            <Input.TextArea
              rows={10}
              onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            />
          </Form.Item>

          <Form.Item name="status" label="Status" valuePropName="status">
            <Switch
              defaultChecked={true}
              onChange={(e) =>
                setBlog({ ...blog, status: e === undefined ? true : e })
              }
            />
          </Form.Item>

          <Form.Item
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
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
