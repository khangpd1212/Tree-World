import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Modal, Switch, Upload } from "antd";
import React, { useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchBlogs } from "redux/blog";
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
export default function ModalEditBlog({
  visible,
  setVisible,
  selected,
  setSelected,
}) {
  const { adminItems } = useSelector((state) => state.userState);
  const [imgBase64, setImgBase64] = useState("");
  const dispatch = useDispatch();
  const token = adminItems.isAdmin ? adminItems.accessToken : null;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [blog, setBlog] = useState({
    title: selected.title,
    content: selected.content,
    status: selected.status,
  });

  const onFinish = (values) => {
    if (
      !validations.checkBlankSpace(values.title) ||
      !validations.checkBlankSpace(values.content)
    ) {
      toast.error("You are not allowed text only white space");
    } else {
      // console.log(imgBase64, previewImage, previewTitle, previewVisible);
      if (imgBase64 !== "") {
        // console.log(values, imgBase64);
        requests
          .editBlog(token, { ...values, image: imgBase64 }, selected._id)
          .then((res) => {
            console.log(res);
            if (res.status) {
              dispatch(fetchBlogs());
              setVisible(false);
              toast.success(`Update successfully!`);
            } else {
              toast.error("Failed");
            }
          });
      } else {
        requests.editBlog(token, values, selected._id).then((res) => {
          console.log(res);
          if (res.status) {
            dispatch(fetchBlogs());
            setVisible(false);
            toast.success(`Update successfully!`);
          } else {
            toast.error("Failed");
          }
        });
      }
    }
  };
  const onFinishFailed = (err) => {
    toast.error(`Failed`);
  };

  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = useCallback(async (file) => {
    setPreviewVisible(true);

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  }, []);
  const handleChange = useCallback(async (info) => {
    if (info.file.status === "uploading") {
      info.file.status = "done";
    }
    if (info.file.status === "done") {
      const hash = await getBase64(info.file.originFileObj);
      setImgBase64(hash);
      setFileList(info.fileList);
    }
  }, []);
  const FormEdit = useCallback(() => {
    return (
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          title: selected.title,
          content: selected.content,
          status: selected.status,
        }}
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
          <Input defaultValue={selected.title} />
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
          <Input.TextArea rows={10} defaultValue={selected.content} />
        </Form.Item>

        <Form.Item
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Image src={selected.image} width="120px" />
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            onPreview={handlePreview}
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
  }, [
    selected,
    imgBase64,
    fileList,
    previewImage,
    previewTitle,
    previewVisible,
  ]);
  return (
    <>
      <Modal
        title="Edit Blog"
        centered
        visible={visible}
        onOk={() => {
          setVisible(false);
          setSelected({});
        }}
        onCancel={() => {
          setVisible(false);
          setSelected({});
        }}
        footer={false}
        width="50%"
        className="edit-product"
      >
        <FormEdit />
      </Modal>
    </>
  );
}
